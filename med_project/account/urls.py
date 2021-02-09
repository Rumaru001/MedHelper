from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import CustomTokenObtainPairView, DeleteUserAPI, DoctorList, PatientList, ProfileAPI

from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .views import (
    RegistrationAPIView,
    HelloWorldView, LogoutApiView,
    ChangePasswordView)

urlpatterns = [
    path('token/obtain/', CustomTokenObtainPairView.as_view(),
         name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('delete/', DeleteUserAPI.as_view(), name='deleteUser'),
    re_path(r'^doctors/$', DoctorList.as_view(), name='doctors'),
    re_path(r'^patients/$', PatientList.as_view(), name='patients'),
    path('change_password/', ChangePasswordView.as_view(),
         name='auth_change_password'),  # <int:pk>/
    path('users/profile/', ProfileAPI.as_view())
]
