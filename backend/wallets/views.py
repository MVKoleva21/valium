from django.shortcuts import get_object_or_404
from .models import Wallet
from users.models import User
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponse
import json
from django.forms.models import model_to_dict
import wallets.backend as backend

def convert(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    body = json.loads(request.body.decode("utf-8"))
    user = get_object_or_404(User, pk=request.user.id)  

    if body["from"] == "BGN" and body["to"] == "EUR":
        if not user.wallet.bgn <= 0:
            user.wallet.bgn -= int(body["amount"])
            user.wallet.bgn = max(0, user.wallet.bgn)

            user.wallet.eur += backend.eur_to_bgn(int(body["amount"]))
            user.wallet.save()
    elif body["from"] == "EUR" and body["to"] == "BGN":
        if not user.wallet.eur <= 0:
            user.wallet.eur -= int(body["amount"])
            user.wallet.eur = max(0, user.wallet.eur)

            if user.wallet.eur < 0:
                user.wallet.eur = 0

            user.wallet.bgn += backend.bgn_to_eur(int(body["amount"]))
            user.wallet.save()

    return JsonResponse(model_to_dict(user.wallet))
