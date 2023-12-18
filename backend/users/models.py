from django.db import models

class User(models.Model):
    username = models.CharField(max_lenght=100)
    email = models.EmailField(unique=True)
    pfp = models.CharField(max_lenght=300)
    isActive = models.BooleanField(default=True)
