# Generated by Django 5.0 on 2024-01-24 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inbox', '0003_remove_inboxentry_wallet'),
    ]

    operations = [
        migrations.AddField(
            model_name='inboxentry',
            name='title',
            field=models.TextField(null=True),
        ),
    ]
