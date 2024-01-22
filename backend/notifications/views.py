from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from users.models import User
from .models import Notification
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import backend
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    operation_description="Update notification to read",
    responses={200: 'OK'},
    method="PUT",
)
@api_view(['PUT'])
@login_required
def read_notification(request, id):
    notification = backend.mark_as_read(id)

    return Response(model_to_dict(notification))

@swagger_auto_schema(
    operation_description="Create new notification",
    responses={201: 'Created'},
    method="POST",
)
@api_view(['POST'])
@login_required
def add_notification(request):
    body = request.data
    notification = backend.new_notification(body, request.user.id)  

    return Response(model_to_dict(notification))

@swagger_auto_schema(
    operation_description="Get all notifications",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_notifications(request):
    notifications = backend.get_notifications(request.user.id, False)

    return Response(list(notifications.values()))

@swagger_auto_schema(
    operation_description="Get only unread notifications",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_notifications_unread(request):
    notifications = backend.get_notifications(request.user.id, True)

    return Response(list(notifications.values()))
