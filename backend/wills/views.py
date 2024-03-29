from django.shortcuts import redirect, get_object_or_404
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from users.models import User
from notifications.models import Notification
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import backend
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    operation_description="Update will",
    responses={200: 'OK'},
    method="PUT",
)
@api_view(['PUT'])
@login_required
def update_will(request, id):
    body = request.data

    try:
        new_will = backend.update_will(body, request.user, id)
    except Exception as err:
        return Response({"error": str(err)}, status=404)

    return Response(model_to_dict(new_will))

@swagger_auto_schema(
    operation_description="Add new will",
    responses={201: 'Created'},
    method="POST",
)
@api_view(['POST'])
@login_required
def add_new_will(request):
    body = request.data

    try:
        new_will = backend.add_new_will(body, request.user)
    except Exception as err:
        return Response({"error": str(err)}, status=404)

    return Response(model_to_dict(new_will))

@swagger_auto_schema(
    operation_description="Get all user wills",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_wills(request):
    wills = backend.get_wills(request.user)

    return Response(wills)

@swagger_auto_schema(
    operation_description="Get specific will",
    responses={200: 'OK'},
    method="GET",
)
@api_view(['GET'])
@login_required
def get_will(request, id):
    will = backend.get_will(request.user, id)

    return Response(model_to_dict(will))

@swagger_auto_schema(
    operation_description="Delete specific will",
    responses={204: 'Delete'},
    method="DELETE",
)
@api_view(['DELETE'])
@login_required
def delete_will(request, id):
    will = backend.delete_will(request.user, id)

    return Response(model_to_dict(will))
