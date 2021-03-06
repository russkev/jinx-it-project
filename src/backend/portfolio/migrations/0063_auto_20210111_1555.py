# Generated by Django 3.1 on 2021-01-11 04:55

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0062_auto_20210111_1553'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='id',
        ),
        migrations.RemoveField(
            model_name='portfolio',
            name='id',
        ),
        migrations.AlterField(
            model_name='page',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True),
        ),
    ]
