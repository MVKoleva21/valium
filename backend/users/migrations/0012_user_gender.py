# Generated by Django 5.0 on 2024-01-13 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_usertorecieve_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(default='None', max_length=100),
        ),
    ]
