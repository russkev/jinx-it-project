# Generated by Django 3.1 on 2021-01-09 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0059_section_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='type',
            field=models.CharField(default='text', max_length=100),
        ),
    ]