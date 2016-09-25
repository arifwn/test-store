
from decimal import Decimal

from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from django.conf import settings
from django.utils.timezone import localtime, now


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True, help_text="Markdown formatting accepted.")
    image = models.ImageField(upload_to='product_images/%Y/%m/', blank=True)
    price = models.DecimalField(max_digits=19, decimal_places=2)
    quantity = models.IntegerField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    virtual = models.BooleanField(default=False, blank=True, help_text="Non-physical product, does not require shipping.")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    categories = models.ManyToManyField('ProductCategory')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super(Product, self).save(*args, **kwargs)

    def is_in_stock(self):
        if self.quantity == None:
            return True
        if self.quantity > 0:
            return True

        return False

    def product_price(self):
        currency = getattr(settings, 'CURRENCY', 'IDR')
        return '{0} {1:,}'.format(currency, self.price)


class ProductCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super(ProductCategory, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Product categories"


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.TextField()
    postal_code = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{0}, {1}, {2}, {3}".format(self.name, self.address, self.city, self.postal_code)


class Coupon(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    percentage_off = models.IntegerField()

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_STATUS = (
                    ('PENDING_PAYMENT', 'Pending Payment'), # order received (unpaid)
                    ('FAILED', 'Failed'), # payment failed or declined
                    ('PROCESSING', 'Processing'), # payment received and stock has been reduced
                    ('COMPLETED', 'Completed'), # order fulfilled
                    ('CANCELED', 'Canceled'), # canceled by admin or customer
                    ('REFUNDED', 'Refunded') # refunded by admin
                   )
    checkout_date = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, blank=True, null=True)
    status = models.CharField(max_length=255, choices=ORDER_STATUS, blank=True, default=ORDER_STATUS[0][0])
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    payment_proof = models.TextField(blank=True)
    payment_proof_attachment = models.FileField(upload_to='payment_proof/%Y/%m/', blank=True)

    class QuantityException(Exception):
        pass

    def __str__(self):
        if self.id:
            return "Order #{0} by {1} (Status: {2})".format(self.id, self.user, self.status)
        else:
            return "New Order by {0} (Status: {1})".format(self.user, self.status)

    def total(self):
        total = 0
        for orderitem in self.orderitem_set.all():
            total += orderitem.quantity * orderitem.product.price

        if self.coupon:
            return total * Decimal(self.coupon.percentage_off / 100.0)

        return total

    def total_price(self):
        currency = getattr(settings, 'CURRENCY', 'IDR')
        return '{0} {1:,}'.format(currency, self.total())

    def checkout(self):
        self.checkout_date = localtime(now())
        self.status = 'PENDING_PAYMENT'
        self.save()

    def confirm_payment(self, proof, proof_attachment_file=None):
        products = []
        for orderitem in self.orderitem_set.all():
            if orderitem.product == None or orderitem.product.quantity == None:
                continue

            if orderitem.quantity > orderitem.product.quantity:
                raise Order.QuantityException("{0} stock is less than ordered".format(orderitem.product))
            else:
                orderitem.product.quantity -= orderitem.quantity
            products.append(orderitem.product)

        for product in products:
            product.save()

        self.status = 'PROCESSING'
        self.save()

    def complete(self):
        self.status = 'COMPLETED'
        self.save()

    def cancel(self):
        self.status = 'CANCELED'
        self.save()


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{0}; Qty: {1}".format(self.product, self.quantity)

