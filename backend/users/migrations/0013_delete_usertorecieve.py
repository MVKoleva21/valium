# Generated by Django 5.0 on 2024-01-17 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_user_gender'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserToRecieve',
        ),
    ]
