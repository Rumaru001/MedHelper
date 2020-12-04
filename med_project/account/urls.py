from django.urls import path
from django.conf.urls import url

from .views import RegistrationAPIView, LoginAPIView

urlpatterns = [
    path('register/', RegistrationAPIView.as_view()),
    url(r'^login/?$', LoginAPIView.as_view()),
    # path('login/', LoginAPIView.as_view()),
]
