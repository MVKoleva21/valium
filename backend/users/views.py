from django.shortcuts import render
from django.http import JsonResponse
from django.forms.models import model_to_dict

def get_user(request):
    user_dict = model_to_dict(request.user)
    return JsonResponse(user_dict)
