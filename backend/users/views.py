from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from .models import User
from wallets.models import Wallet
import json

def get_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id) 

    user_dict = model_to_dict(user)
    wallet_dict = model_to_dict(user.wallet)
    user_dict["wallet"] = wallet_dict
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
        return redirect('/api/v1/current/user/')
    except User.DoesNotExist:
        return JsonResponse({"error": "Oh no user does not exist"})
    
