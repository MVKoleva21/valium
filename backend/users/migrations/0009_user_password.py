# Generated by Django 5.0 on 2024-01-13 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_delete_userstoconfirm'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.TextField(blank=True),
        ),
    ]
