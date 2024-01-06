from django.urls import path
from . import views

urlpatterns = [
    path('current/user/', views.get_user),
    path('successful/', views.redirect_successful),
    path('users/new/', views.new_user),
]
