# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-25 11:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20160925_1858'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productcategory',
            name='products',
        ),
        migrations.AddField(
            model_name='product',
            name='categories',
            field=models.ManyToManyField(to='store.ProductCategory'),
        ),
    ]
