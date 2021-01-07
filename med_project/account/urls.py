from django.urls import path, include
from django.views.generic import TemplateView
from .views import CustomTokenObtainPairView, DeleteUserAPI, ProfileAPI

from django.urls import path
from django.conf.urls import url

from rest_framework_simplejwt import views as jwt_views

from .views import (
    RegistrationAPIView,
    HelloWorldView, LogoutApiView,
    ChangePasswordView)

urlpatterns = [
    path('token/obtain/', CustomTokenObtainPairView.as_view(),
         name='token_create'),  # override sjwt stock token
    path('token/refresh/', CustomTokenObtainPairView.as_view(), name='token_refresh'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('delete/', DeleteUserAPI.as_view(), name='deleteUser'),
    path('change_password/', ChangePasswordView.as_view(),
         name='auth_change_password'),  # <int:pk>/
    path('users/profile/', ProfileAPI.as_view())
]
