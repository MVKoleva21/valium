from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from .models import User

def get_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = get_object_or_404(User, pk=request.user.id) 
    user_dict = model_to_dict(user)
    return JsonResponse(user_dict)


def redirect_successful(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user, created = User.objects.get_or_create(
        username=request.user.username,
        email=request.user.email,
        name=f"{request.user.first_name} {request.user.last_name}",
        is_active=True
    )

    return redirect('/api/current/user')
