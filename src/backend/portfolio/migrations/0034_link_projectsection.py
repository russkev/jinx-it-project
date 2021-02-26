# Generated by Django 3.1 on 2020-12-09 00:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('portfolio', '0033_auto_20201028_0750'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectSection',
            fields=[
                ('section_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='portfolio.section')),
                ('content', models.TextField(blank=True)),
            ],
            bases=('portfolio.section',),
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.CharField(choices=[('None', 'None'), ('Github', 'Github'), ('Web', 'Web')], default='None', max_length=20)),
                ('address', models.TextField(blank=True)),
                ('title', models.TextField(blank=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='links', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
