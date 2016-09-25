
from django.contrib import admin
from django.utils.html import format_html
from django.conf import settings

from .models import Product, ProductCategory, Address, Coupon, Order, OrderItem


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_categories', 'product_price', 'quantity', 'orders', 'is_in_stock', 'modified')
    list_filter = ('categories',)

    def product_categories(self, obj):
        return ', '.join(category.name for category in obj.categories.all())

    def orders(self, obj):
        count = 0;
        for orderitem in obj.orderitem_set.all():
            if orderitem.quantity:
                count = count + orderitem.quantity

        return count


class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'product_count')

    def product_count(self, obj):
        return obj.product_set.count()


class CouponAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'percentage_off')


class AddressAdmin(admin.ModelAdmin):
   list_display = ('__str__', 'user')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_price', 'status', 'user', 'coupon', 'checkout_date')

    def name(self, obj):
        return 'Order #{0}'.format(obj.id)


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('product', 'order', 'user')


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
