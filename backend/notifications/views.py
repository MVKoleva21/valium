from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponse
from users.models import User
from .models import Notification
import json

def add_notification(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)   

    body = json.loads(request.body.decode("utf-8"))
    user = User.objects.get(pk=request.user.id)

    notification = Notification.objects.create(user=user, message=body["message"])

    return JsonResponse(model_to_dict(notification))

def get_notifications(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401) 

    user = User.objects.get(pk=request.user.id)
    notifications = Notification.objects.filter(user=user)

    return JsonResponse(list(notifications.values()), safe=False)

def get_notifications_unread(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401) 

    user = User.objects.get(pk=request.user.id)
    notifications = Notification.objects.filter(user=user, is_read=False)

    return JsonResponse(list(notifications.values()), safe=False)
