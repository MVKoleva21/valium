from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    pin = models.CharField(max_length=10, default="0000000000") 
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "users"
