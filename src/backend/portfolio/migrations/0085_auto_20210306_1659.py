# Generated by Django 3.1.7 on 2021-03-06 05:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0084_portfolio_profile_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfolio',
            old_name='profile_picture',
            new_name='avatar',
        ),
    ]