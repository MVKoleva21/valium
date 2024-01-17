from users.models import User
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from .models import Notification

def mark_as_read(id):
    notification = Notification.objects.get(pk=id)
    notification.is_read = True
    notification.save()

    return notification

def new_notification(data, id):
    user = User.objects.get(pk=id)

    return Notification.objects.create(user=user, message=data["message"])

def get_notifications(id, unread_only):
    user = User.objects.get(pk=id)
    return Notification.objects.filter(user=user, is_read=(not unread_only))
