from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.add_new_will),
    path('get/', views.get_wills),
    path('<int:id>/get/', views.get_will),
    path('<int:id>/delete/', views.delete_will),
    path('<int:id>/update/', views.update_will)
]
