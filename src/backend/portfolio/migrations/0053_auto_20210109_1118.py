# Generated by Django 3.1 on 2021-01-09 00:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0052_portfolio_uuid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imagetextsection',
            name='image',
        ),
        migrations.RemoveField(
            model_name='imagetextsection',
            name='section_ptr',
        ),
        migrations.RemoveField(
            model_name='mediasection',
            name='section_ptr',
        ),
        migrations.RemoveField(
            model_name='textsection',
            name='section_ptr',
        ),
        migrations.DeleteModel(
            name='ImageSection',
        ),
        migrations.DeleteModel(
            name='ImageTextSection',
        ),
        migrations.DeleteModel(
            name='MediaSection',
        ),
        migrations.DeleteModel(
            name='TextSection',
        ),
    ]
