from django.db import models

class Wallet(models.Model):
    bgn = models.FloatField(default=1000)
    eur = models.FloatField(default=50)
    btc = models.FloatField(default=0.5)
    etc = models.FloatField(default=0.5)

    class Meta:
       db_table = "wallets"
