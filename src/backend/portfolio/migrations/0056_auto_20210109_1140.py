# Generated by Django 3.1 on 2021-01-09 00:40

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0055_link_uuid'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PageLink',
        ),
        migrations.DeleteModel(
            name='PortfolioLink',
        ),
        migrations.DeleteModel(
            name='SectionLink',
        ),
    ]
