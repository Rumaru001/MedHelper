from django.urls import path, include
from django.views.generic import TemplateView
from .views import ProfileAPI

urlpatterns = [
    path('users/<int:user_id>/profile/', ProfileAPI.as_view())
]
