
from django.test import TestCase
from django.contrib.auth.models import User

from .models import Product, ProductCategory, Address, Coupon, Order, OrderItem


class CreateOrderTests(TestCase):
    fixtures = ['dummy.json']

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_get_order(self):
        order = Order.objects.get(id=1)
        self.assertEqual(order.total(), 158000)

    def create_order(self, username, product_slugs, quantities, coupon=None):
        user = User.objects.get(username=username)
        order = Order(user=user, coupon=coupon)
        order.save()

        products = []

        for i, product_slug in enumerate(product_slugs):
            product = Product.objects.get(slug=product_slug)
            product.save()

            products.append(product)

        self.assertEqual(len(products), len(product_slugs))

        # "cart" is actually order items without order attr set
        orderitems = []
        for i, quantity in enumerate(quantities):
            orderitem = OrderItem(product=products[i], user=user, quantity=quantity)
            orderitem.save()

            orderitems.append(orderitem)


        # simulate checkout process
        for orderitem in orderitems:
            orderitem.order = order
            orderitem.save()

        return (order, products, orderitems)

    def test_order(self):
        product_slugs = ['live-bunny', 'yummy-cat-food-canned', 'pre-sliced-watermelon']
        quantities = [2, 2, 2]

        order, products, orderitems = self.create_order(
                            username='test',
                            product_slugs=product_slugs,
                            quantities=quantities
                         )

        order.checkout()
        self.assertEqual(order.status, 'PENDING_PAYMENT')

        old_quantities = []
        for i, product_slug in enumerate(product_slugs):
            old_quantities.append(products[i].quantity)

        order.confirm_payment('test proof')
        self.assertEqual(order.status, 'PROCESSING')

        for i, product_slug in enumerate(product_slugs):
            product = Product.objects.get(id=products[i].id)
            self.assertEqual(old_quantities[i] - quantities[i], product.quantity)

        self.assertEqual(order.total(), 320000)

    def test_order_with_coupon(self):
        product_slugs = ['live-bunny', 'yummy-cat-food-canned', 'pre-sliced-watermelon']
        quantities = [2, 2, 2]

        coupon = Coupon.objects.get(code='HALF')

        order, products, orderitems = self.create_order(
                            username='test',
                            product_slugs=product_slugs,
                            quantities=quantities,
                            coupon=coupon
                         )

        order.checkout()
        self.assertEqual(order.status, 'PENDING_PAYMENT')

        old_quantities = []
        for i, product_slug in enumerate(product_slugs):
            old_quantities.append(products[i].quantity)

        order.confirm_payment('test proof')
        self.assertEqual(order.status, 'PROCESSING')

        for i, product_slug in enumerate(product_slugs):
            product = Product.objects.get(id=products[i].id)
            self.assertEqual(old_quantities[i] - quantities[i], product.quantity)

        self.assertEqual(order.total(), 160000)

    def test_order_stock_too_low(self):
        product_slugs = ['live-bunny', 'yummy-cat-food-canned', 'pre-sliced-watermelon']
        quantities = [2, 2, 22]

        order, products, orderitems = self.create_order(
                            username='test',
                            product_slugs=product_slugs,
                            quantities=quantities
                         )

        order.checkout()
        self.assertEqual(order.status, 'PENDING_PAYMENT')

        old_quantities = []
        for i, product_slug in enumerate(product_slugs):
            old_quantities.append(products[i].quantity)

        self.assertRaises(Order.QuantityException, order.confirm_payment, 'test proof')


