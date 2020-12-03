from django.urls import path, include
from . import views

urlpatterns = [
    # path('login/', views.login_page),
    # path('PatientRegister/', views.register_page),
    # path('register/', views.register),
    # # path('accounts/', include('django.contrib.auth.urls')),
    # path('account/register/', views.index(), name='register'),
    path('register/patient/', views.PatientRegistration.as_view(),name='patient_register'),
    path('register/doctor/', views.DoctorRegistration.as_view(), name='doctor_register'),
    path('login/', views.UserLogin.as_view()),
]


