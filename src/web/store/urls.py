from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^about/$', views.index, name='about'),
    url(r'^cart/$', views.index, name='cart'),
    url(r'^$', views.index, name='index'),
]
