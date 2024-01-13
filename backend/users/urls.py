from django.urls import path
from . import views

urlpatterns = [
    path('current/', views.get_user),
    path('login/successful/', views.redirect_successful),
    path('new/', views.new_user),
    path('add/recieve/', views.add_users_to_recieve),
    path('get/confirm', views.get_users_to_confirm),
    path('suspend/', views.suspend_user),
    path('confirm/', views.confirm_death),
]
