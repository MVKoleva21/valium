from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponse
from users.models import User
from .models import InboxEntry
from wallets.models import Wallet
import json

def get_inbox_entry(request, id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)   

    user = User.objects.get(pk=request.user.id)
    inbox_entry = InboxEntry.objects.get(pk=id, user=user)
    return JsonResponse(model_to_dict(inbox_entry))

def get_inbox(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401) 

    user = User.objects.get(pk=request.user.id)
    inbox = InboxEntry.objects.filter(user=user)

    return JsonResponse(list(inbox.values()), safe=False)
