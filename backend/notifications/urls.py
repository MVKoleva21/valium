from django.urls import path
from . import views

urlpatterns = [
   path('new/', views.add_notification),
   path('get/', views.get_notifications),
   path('get/unread/', views.get_notifications_unread),
   path('<int:id>/read/', views.read_notification),
]
