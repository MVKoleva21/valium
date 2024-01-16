from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from .models import User, UserToRecieve
from wallets.models import Wallet
from notifications.models import Notification
from inbox.models import InboxEntry
import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def confirm_death(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id)
    body = request.data

    user_to_confirm = User.objects.get(email=body["user"])

    if not user_to_confirm.is_suspended:
        return Reponse({"error": "User not suspended"})

    users_to_confirm = UserToRecieve.objects.filter(transfer_from=user_to_confirm)

    for i, j in enumerate(users_to_confirm):
        if user.id == j.transfer_to_id:
            break;

        elif i == len(users_to_confirm) - 1:
            return Response({"error": "User not allowed to confirm"})

    user_to_confirm.is_active = False
    user_to_confirm.save()

    if not user_to_confirm.is_active:
        for i in users_to_confirm:
            user_to = User.objects.get(pk=i.transfer_to_id)
            transfer_amount = Wallet.objects.get(pk=i.transfer_amount_id)
            
            user_to.wallet.bgn += transfer_amount.bgn
            user_to.wallet.eur += transfer_amount.eur
            user_to.wallet.btc += transfer_amount.btc
            user_to.wallet.etc += transfer_amount.etc
            user_to.wallet.save()

            user_to_confirm.wallet.bgn -= transfer_amount.bgn
            user_to_confirm.wallet.eur -= transfer_amount.eur
            user_to_confirm.wallet.btc -= transfer_amount.btc
            user_to_confirm.wallet.etc -= transfer_amount.etc
            user_to_confirm.wallet.save()

            InboxEntry.objects.create(user=user_to, message=i.message, wallet=user_to.wallet)

        users_to_confirm.delete()

    return Response(model_to_dict(user_to_confirm))

@api_view(['POST'])
def suspend_user(request):
    if not request.user.is_authenticated:
        return Response(status=401)

    user = get_object_or_404(User, pk=request.user.id)
    body = request.data

    user_to_suspend = User.objects.get(email=body["user"])
    users_to_confirm = UserToRecieve.objects.filter(transfer_from=user_to_suspend)

    for i, j in enumerate(users_to_confirm):
        if user.id == j.transfer_to_id:
            break;

        elif i == len(users_to_confirm) - 1:
            return Response({"error": "User not allowed to suspend"})

    user_to_suspend.is_suspended = True
    user_to_suspend.save()

    for i in users_to_confirm:
        user_to_notify = User.objects.get(pk=i.transfer_to_id)

        Notification.objects.create(user=user_to_notify, message=f"Do you confirm the death of {user_to_suspend.name}?")

    return Response(model_to_dict(user_to_suspend))

@api_view(['GET'])
def get_users_to_confirm(request):
    if not request.user.is_authenticated:
        return Response(status=401)

    user = get_object_or_404(User, pk=request.user.id) 
    users_to_confirm = UserToRecieve.objects.filter(transfer_from=user)

    return Response(list(users_to_confirm.values()))

@api_view(['POST'])
def add_users_to_recieve(request):
    if not request.user.is_authenticated:
        return Response(status=401)

    body = request.data
    user = get_object_or_404(User, pk=request.user.id) 
    users_to_recieve = UserToRecieve.objects.filter(transfer_from=user)

    for i in body:
        if (float(i["amount"]["bgn"]) > user.wallet.bgn) or (float(i["amount"]["eur"]) > user.wallet.eur) or (float(i["amount"]["btc"]) > user.wallet.btc) or (float(i["amount"]["etc"]) > user.wallet.etc):
            return Rsponse({"error": "Not enough ballance"})

        if not users_to_recieve:
            temp_user = get_object_or_404(User, email=i['user'])
            transfer_wallet = Wallet.objects.create(
                    bgn=i["amount"]["bgn"],
                    eur=i["amount"]["eur"],
                    btc=i["amount"]["btc"],
                    etc=i["amount"]["etc"]
                    )

            new_user_to_recieve = UserToRecieve.objects.create(transfer_from=user, transfer_amount=transfer_wallet, transfer_to=temp_user, message=i["message"])
        else:
            for j in users_to_recieve:
                user.wallet.bgn -= float(i["amount"]["bgn"])
                user.wallet.eur -= float(i["amount"]["eur"])
                user.wallet.btc -= float(i["amount"]["btc"])
                user.wallet.etc -= float(i["amount"]["etc"])

                temp_user = get_object_or_404(User, email=i['user'])

                if temp_user == j.transfer_to:
                    j.transfer_amount.bgn = float(i["amount"]["bgn"])
                    j.transfer_amount.eur = float(i["amount"]["eur"])
                    j.transfer_amount.btc = float(i["amount"]["btc"])
                    j.transfer_amount.etc = float(i["amount"]["etc"])

                    j.transfer_amount.save()
                else:
                    transfer_wallet = Wallet.objects.create(
                        bgn=float(i["amount"]["bgn"]),
                        eur=float(i["amount"]["eur"]),
                        btc=float(i["amount"]["btc"]),
                        etc=float(i["amount"]["etc"])
                    )

                    new_user_to_recieve = UserToRecieve.objects.create(transfer_from=user, transfer_amount=transfer_wallet, transfer_to=temp_user, message=i["message"])

    return Response(list(users_to_recieve.values()))

@api_view(['GET'])
def get_user(request):
    if not request.user.is_authenticated:
        return Response(status=401)

    user = get_object_or_404(User, pk=request.user.id) 

    user_dict = model_to_dict(user)

    users_to_recieve = UserToRecieve.objects.filter(transfer_from=user)

    user_dict["transfer_to"] = list(users_to_recieve.values())

    for i in user_dict["transfer_to"]:
        transfer_amount = Wallet.objects.get(pk=i["transfer_amount_id"])
        i["transfer_amount"] = model_to_dict(transfer_amount)
        i["transfer_to_email"] = User.objects.get(pk=i["transfer_to_id"]).email

    user_dict["wallet"] = model_to_dict(user.wallet)

    return Response(user_dict)

@api_view(['POST'])
def new_user(request):
    if not request.user.is_authenticated:
        return Response(status=401)

    body = request.data
    new_wallet = Wallet.objects.create()

    new_user = User.objects.create(
        email=request.user.email,
        username=body["username"],
        name=body["name"],
        pin=body["pin"],
        is_active=True,
        gender=body["gender"],
        wallet=new_wallet)

    return Response(model_to_dict(new_user))

@api_view(['GET'])
def redirect_successful(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    
    try:
        user = User.objects.get(email=request.user.email)
        return redirect(f"{os.environ.get('BASE_URL_FRONTEND')}/wills")
    except User.DoesNotExist:
        return redirect(f"{os.environ.get('BASE_URL_FRONTEND')}/accounts/finilize")
    
