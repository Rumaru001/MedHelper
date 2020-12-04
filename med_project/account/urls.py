from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from .views import UserRegistrationView, UserLoginView

urlpatterns = [
    url(r'^register', UserRegistrationView.as_view()),
    url(r'^login', UserLoginView.as_view()),
]
