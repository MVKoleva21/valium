from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from users.models import User
from .models import InboxEntry
from wallets.models import Wallet
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def get_inbox_entry(request, id):
    if not request.user.is_authenticated:
        return Response(status=401)   

    user = User.objects.get(pk=request.user.id)
    inbox_entry = InboxEntry.objects.get(pk=id, user=user)
    return Response(model_to_dict(inbox_entry))

@api_view(["GET"])
def get_inbox(request):
    if not request.user.is_authenticated:
        return Response(status=401) 

    user = User.objects.get(pk=request.user.id)
    inbox = InboxEntry.objects.filter(user=user)

    return Response(list(inbox.values()), safe=False)
