from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.add_new_will),
    path('get/', views.get_wills),
    path('get/<int:id>', views.get_will),
    path('delete/<int:id>', views.delete_will),
    path('update/<int:id>', views.update_will)
]
