from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from users.models import User
from .models import Notification
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['PUT'])
def read_notification(request, id):
    if not request.user.is_authenticated:
        return Response(status=401)   

    notification = Notification.objects.get(pk=id)
    notification.is_read = True
    notification.save()

    return Response(model_to_dict(notification))

@api_view(['POST'])
def add_notification(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)   

    body = request.data
    user = User.objects.get(pk=request.user.id)

    notification = Notification.objects.create(user=user, message=body["message"])

    return Response(model_to_dict(notification))

@api_view(['GET'])
def get_notifications(request):
    if not request.user.is_authenticated:
        return Response(status=401) 

    user = User.objects.get(pk=request.user.id)
    notifications = Notification.objects.filter(user=user)

    return Response(list(notifications.values()))

@api_view(['GET'])
def get_notifications_unread(request):
    if not request.user.is_authenticated:
        return Response(status=401) 

    user = User.objects.get(pk=request.user.id)
    notifications = Notification.objects.filter(user=user, is_read=False)

    return Response(list(notifications.values()))
