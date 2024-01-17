from .models import User
from django.shortcuts import get_object_or_404
from wallets.models import Wallet
from django.forms.models import model_to_dict

def get_user_info(id):
    user = get_object_or_404(User, pk=id) 
    user_dict = model_to_dict(user)

    user_dict["wallet"] = model_to_dict(user.wallet)

    return user_dict

def add_user(data, email):
    new_wallet = Wallet.objects.create()

    new_user = User.objects.create(
        email=email,
        username=data["username"],
        name=data["name"],
        pin=data["pin"],
        is_active=True,
        gender=data["gender"],
        wallet=new_wallet)

    return new_user
