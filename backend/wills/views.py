from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from users.models import User
from notifications.models import Notification
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import backend

@api_view(['PUT'])
@login_required
def update_will(request, id):
    body = request.data

    try:
        new_will = backend.update_will(body, request.user, id)
    except Exception as err:
        return Response({"error": str(err)})

    return Response(model_to_dict(new_will))

@api_view(['POST'])
@login_required
def add_new_will(request):
    body = request.data

    try:
        new_will = backend.add_new_will(body, request.user)
    except Exception as err:
        return Response({"error": str(err)})

    return Response(model_to_dict(new_will))

@api_view(['GET'])
@login_required
def get_wills(request):
    wills = backend.get_wills(request.user)

    return Response(wills)

@api_view(['GET'])
@login_required
def get_will(request, id):
    will = backend.get_will(request.user, id)

    return Response(model_to_dict(will))

@api_view(['DELETE'])
@login_required
def delete_will(request, id):
    will = backend.delete_will(request.user, id)

    return Response(model_to_dict(will))
