# Generated by Django 5.0 on 2024-01-19 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wills', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='will',
            name='transferData',
        ),
        migrations.AddField(
            model_name='will',
            name='transferDate',
            field=models.DateTimeField(null=True),
        ),
    ]
