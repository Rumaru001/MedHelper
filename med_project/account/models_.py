from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#substituting-a-custom-user-model

class User(AbstractBaseUser):
    ADMIN = 1000
    PATIENT = 0
    DOCTOR = 1
    USER_STATUS_CHOICES = [
        (1000,'admin'),
        (0,'patient'),
        (1,'doctor')
    ]
    user_status = models.CharField(max_length=20 , choices=USER_STATUS_CHOICES, default=PATIENT)

    email           = models.EmailField(verbose_name='email', max_length=60, unique=True, blank=False)
    username        = models.CharField(max_length=30, unique=True, blank=False)

    first_name      = models.CharField(verbose_name="first name", max_length=30, blank=False)
    second_name     = models.CharField(verbose_name="second name", max_length=30, blank=False)
    date_of_birth   = models.DateField(verbose_name="date of birth", blank= True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name', 'second_name', 'date_of_birth']


class Patient(User):
    height          = models.FloatField(verbose_name="height", blank= True)
    weight          = models.FloatField(verbose_name="weight", blank= True)


class Doctor(User):
    place_of_work   = models.CharField(verbose_name="place of work", max_length=128, blank=True)

