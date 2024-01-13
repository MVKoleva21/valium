from django.urls import path
from . import views

urlpatterns = [
   path('get/', views.get_inbox),
   path('get/<int:id>/', views.get_inbox_entry),
]
