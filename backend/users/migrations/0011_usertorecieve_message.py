# Generated by Django 5.0 on 2024-01-13 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_remove_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertorecieve',
            name='message',
            field=models.TextField(blank=True),
        ),
    ]
