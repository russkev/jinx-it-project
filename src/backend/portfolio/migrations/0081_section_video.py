# Generated by Django 3.1 on 2021-01-19 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0080_section_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='video',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
