# Generated by Django 3.1 on 2020-12-18 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0044_auto_20201218_1249'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='orderNumber',
            field=models.IntegerField(default=0),
        ),
    ]
