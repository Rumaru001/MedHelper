from django.urls import path
from .views import *

urlpatterns = [
    path('', MessageView.as_view(), name='messeges_list'),
    path('delete/<int:pk>/', MessageView.as_view(), name='messege_delete'),
]
