# Generated by Django 3.1 on 2020-12-18 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0043_remove_link_ordernumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='icon',
            field=models.TextField(),
        ),
    ]
