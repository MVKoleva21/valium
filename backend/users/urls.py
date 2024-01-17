from django.urls import path
from . import views

urlpatterns = [
    path('login/successful/', views.redirect_successful),
    path('current/', views.get_user),
    path('new/', views.new_user),
]
