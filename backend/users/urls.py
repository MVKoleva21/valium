from django.urls import path
from . import views

urlpatterns = [
    path("microsoft/", views.login_microsoft)
]
