# Generated by Django 5.0 on 2024-01-12 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_is_suspended_userstoconfirm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_suspended',
            field=models.BooleanField(default=False),
        ),
    ]
