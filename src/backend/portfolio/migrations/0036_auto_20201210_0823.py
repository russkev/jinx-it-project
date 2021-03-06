# Generated by Django 3.1 on 2020-12-09 21:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0035_delete_projectsection'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='link',
            name='owner',
        ),
        migrations.AlterField(
            model_name='link',
            name='id',
            field=models.CharField(max_length=36, primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='PageLink',
            fields=[
                ('link_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='portfolio.link')),
                ('page_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portfolio.page')),
            ],
        ),
    ]
