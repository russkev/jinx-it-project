# Generated by Django 3.1 on 2021-01-11 05:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0064_auto_20210111_1555'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfolio',
            old_name='id',
            new_name='uuid',
        ),
    ]