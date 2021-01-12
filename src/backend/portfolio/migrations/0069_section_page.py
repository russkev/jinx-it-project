# Generated by Django 3.1 on 2021-01-11 05:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0068_remove_section_page'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='page',
            field=models.ForeignKey(default='9e9f0554-9cfe-40fd-abcb-5aef0517a0b0', on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='portfolio.page'),
            preserve_default=False,
        ),
    ]
