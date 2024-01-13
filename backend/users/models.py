from django.db import models
from wallets.models import Wallet

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    pin = models.CharField(max_length=10, default="0000000000") 
    is_active = models.BooleanField(default=True)
    is_suspended = models.BooleanField(default=False)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, default=None)

    class Meta:
        db_table = "users"


class UserToRecieve(models.Model):
    transfer_from = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='transfer_from_set')
    transfer_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    transfer_amount = models.ForeignKey(Wallet, on_delete=models.CASCADE, default=None)
    message = models.TextField(blank=True)

    class Meta:
        db_table = "transfer_users"
