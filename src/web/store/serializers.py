from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import Product, ProductCategory, Address, Coupon, Order, OrderItem


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'url', 'name')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'url', 'name', 'slug', 'description', 'image', 'price', 'quantity', 'weight', 'virtual', 'created', 'modified', 'categories')


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ('id', 'url', 'name', 'slug', 'created', 'modified')


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'url', 'name', 'user', 'address', 'postal_code', 'province', 'city', 'distric', 'phone', 'created', 'modified')


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'url', 'name', 'code', 'percentage_off')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'url', 'checkout_date', 'user', 'coupon', 'status', 'created', 'modified', 'payment_proof', 'payment_proof_attachment')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'url', 'product', 'user', 'quantity', 'order', 'created', 'modified')

