from django.db import models
from users.models import User
from wallets.models import Wallet

class Will(models.Model):
    message = models.TextField(default="")
    amounts = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    inheritor = models.ForeignKey(User, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')      
    active = models.BooleanField(default=True)
    transferDate = models.DateField(null=True)
    effectiveImmediate = models.BooleanField(default=False, null=True)
    willNumber = models.TextField(default="")

    class Meta:
        db_table = "wills"
