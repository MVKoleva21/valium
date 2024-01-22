from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from .models import User
from wallets.models import Wallet
from notifications.models import Notification
from inbox.models import InboxEntry
import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import backend
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    operation_description="Get current user",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_user(request):
    user = backend.get_user_info(request.user.id)

    return Response(user)

@swagger_auto_schema(
    operation_description="Get users emails",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_users_emails(request):
    users = backend.get_users()

    return Response(users)

@swagger_auto_schema(
    operation_description="Create new user",
    responses={201: 'Created'},
    method="POST",
)
@api_view(['POST'])
@login_required
def new_user(request):
    body = request.data
    user = backend.add_user(body, request.user.email)

    return Response(model_to_dict(user))

@swagger_auto_schema(
    operation_description="Redirect users on successful login",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def redirect_successful(request):
    try:
        user = User.objects.get(email=request.user.email)
        return redirect(f"{os.environ.get('BASE_URL_FRONTEND')}/wills")
    except User.DoesNotExist:
        return redirect(f"{os.environ.get('BASE_URL_FRONTEND')}/accounts/finilize")
    
