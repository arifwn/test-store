# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-25 12:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_auto_20160925_1903'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=19),
            preserve_default=False,
        ),
    ]
