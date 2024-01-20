from django.db import models
from users.models import User
from wallets.models import Wallet

class InboxEntry(models.Model):
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "inbox"
