# Generated by Django 4.2.8 on 2024-05-19 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_post_like_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='click_count',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
