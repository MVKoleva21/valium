from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from users.models import User
from .models import InboxEntry
from wallets.models import Wallet
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from . import backend

@swagger_auto_schema(
    operation_description="Retrieve specific inbox entry",
    responses={200: 'OK'},
    method="GET",
)
@api_view(["GET"])
@login_required
def get_inbox_entry(request, id):    
    inbox_entry = backend.get_inbox(request.user.id, id)

    return Response(model_to_dict(inbox_entry))

@swagger_auto_schema(
    operation_description="Retrieve all inbox entry",
    responses={200: 'OK'},
    method="GET",
)
@api_view(["GET"])
@login_required
def get_inbox(request):
    inbox = backend.get_inbox(request.user.id, 0)

    return Response(inbox)
