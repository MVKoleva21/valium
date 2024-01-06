from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from .models import User
import json

def get_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id) 
    user_dict = model_to_dict(user)
    return JsonResponse(user_dict)

def new_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    body = json.loads(request.body.decode("utf-8"))

    user, created = User.objects.get_or_create(
        email=request.user.email,
        username=body["username"],
        name=body["name"],
        pin=body["pin"],
        is_active=True)

    if created:
        return JsonResponse(model_to_dict(created))


    return JsonResponse(model_to_dict(user))

def redirect_successful(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    return redirect('/api/v1/current/user/')
