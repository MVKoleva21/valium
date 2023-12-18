from django.shortcuts import render
from django.http import JsonResponse

def login_microsoft(request):
    return JsonResponse({"data": "You are logged in with microsoft"})
