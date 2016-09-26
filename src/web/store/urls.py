from django.conf.urls import include, url
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

router.register(r'products', views.ProductViewSet)
router.register(r'product-categories', views.ProductCategoryViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'coupons', views.CouponViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'order-items', views.OrderItemViewSet)

urlpatterns = [
    url(r'^about/$', views.index, name='about'),
    url(r'^cart/$', views.index, name='cart'),
    url(r'^checkout/$', views.index, name='checkout'),
    url(r'^orders/$', views.index, name='orders'),
    url(r'^order/\d+/$', views.index, name='order-detail'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^$', views.index, name='index'),
]
