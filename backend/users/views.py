from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from .models import User, UserToRecieve
from wallets.models import Wallet
import json

def suspend_user(request):
    pass

def get_users_to_confirm(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id) 
    users_to_confirm = UserToRecieve.objects.filter(transfer_from=user)

    return JsonResponse(list(users_to_confirm.values()), safe=False)

def add_users_to_recieve(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    body = json.loads(request.body.decode("utf-8"))
    user = get_object_or_404(User, pk=request.user.id) 
    users_to_recieve = UserToRecieve.objects.filter(transfer_from=user)

    for i in body:
        if (i["amount"]["bgn"] > user.wallet.bgn) or (i["amount"]["eur"] > user.wallet.eur) or (i["amount"]["btc"] > user.wallet.btc) or (i["amount"]["etc"] > user.wallet.etc):
            return JsonRsponse({"error": "Not enough ballance"})

        if not users_to_recieve:
            temp_user = get_object_or_404(User, email=i['user'])
            transfer_wallet = Wallet.objects.create(
                    bgn=i["amount"]["bgn"],
                    eur=i["amount"]["eur"],
                    btc=i["amount"]["btc"],
                    etc=i["amount"]["etc"]
                    )

            new_user_to_recieve = UserToRecieve.objects.create(transfer_from=user, transfer_amount=transfer_wallet, transfer_to=temp_user)
        else:
            for j in users_to_recieve:
                user.wallet.bgn -= i["amount"]["bgn"]
                user.wallet.eur -= i["amount"]["eur"]
                user.wallet.btc -= i["amount"]["btc"]
                user.wallet.etc -= i["amount"]["etc"]

                temp_user = get_object_or_404(User, email=i['user'])

                if temp_user == j.transfer_to:
                    j.transfer_amount.bgn = i["amount"]["bgn"]
                    j.transfer_amount.eur = i["amount"]["eur"]
                    j.transfer_amount.btc = i["amount"]["btc"]
                    j.transfer_amount.etc = i["amount"]["etc"]

                    j.transfer_amount.save()
                else:
                    transfer_wallet = Wallet.objects.create(
                        bgn=i["amount"]["bgn"],
                        eur=i["amount"]["eur"],
                        btc=i["amount"]["btc"],
                        etc=i["amount"]["etc"]
                    )

                    new_user_to_recieve = UserToRecieve.objects.create(transfer_from=user, transfer_amount=transfer_wallet, transfer_to=temp_user)

    return JsonResponse(list(users_to_recieve.values()), safe=False)

def get_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id) 

    user_dict = model_to_dict(user)

    users_to_recieve = UserToRecieve.objects.filter(transfer_from=user)

    user_dict["transfer_to"] = list(users_to_recieve.values())

    for i in user_dict["transfer_to"]:
        transfer_amount = Wallet.objects.get(pk=i["transfer_amount_id"])
        i["transfer_amount"] = model_to_dict(transfer_amount)

    user_dict["wallet"] = model_to_dict(user.wallet)

    return JsonResponse(user_dict)

def new_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    body = json.loads(request.body.decode("utf-8"))

    new_wallet = Wallet.objects.create()

    new_user = User.objects.create(
        email=request.user.email,
        username=body["username"],
        name=body["name"],
        pin=body["pin"],
        is_active=True,
        wallet=new_wallet)

    return JsonResponse(model_to_dict(new_user))

def redirect_successful(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    try:
        user = User.objects.get(email=request.user.email)
        return redirect('/api/v1/users/current/')
    except User.DoesNotExist:
        return JsonResponse({"error": "Oh no user does not exist"})
    
