# Generated by Django 3.1 on 2021-01-11 06:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_account_primary_portfolio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='primary_portfolio',
        ),
    ]
