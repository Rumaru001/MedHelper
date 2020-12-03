from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.login_page),
    path('PatientRegister/', views.register_page),
    path('register/', views.register),
    # path('accounts/', include('django.contrib.auth.urls')),
    # path('account/register/', views.index(), name='register'),
    # path('account/register/patient/', name='patient_register'),
    # path('account/register/doctor/', name='doctor_register'),
]
