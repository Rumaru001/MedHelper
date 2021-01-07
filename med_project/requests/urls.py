from django.urls import path
from .views import *

urlpatterns = [
    path('', RequestAPI.as_view()),
    path('<int:pk>/', RequestAPI.as_view()),
]
