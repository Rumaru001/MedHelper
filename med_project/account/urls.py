from django.urls import path
from django.conf.urls import url

from rest_framework_simplejwt import views as jwt_views

from .views import (
    RegistrationAPIView, LoginAPIView,
    HelloWorldView, LogoutApiView)

urlpatterns = [
    # path('register/', RegistrationAPIView.as_view()),
    # url(r'^login/?$', LoginAPIView.as_view()),
    # # path('login/', LoginAPIView.as_view()),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
]
