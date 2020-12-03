from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)

    # first_name = models.CharField(verbose_name="first name", max_length=30)
    # second_name = models.CharField(verbose_name="second name", max_length=30)
    # date_of_birth = models.DateField(verbose_name="date of birth")

    # django required fields
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default='1')

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['first_name', 'second_name', 'date_of_birth']

    # objects = CustomUserManager()

    def __str__(self):
        return self.email

    # def has_perm(self, perm, obj=None):
    #     return self.is_admin
    #
    # def has_module_perms(self, app_lebel):
    #     return True


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(verbose_name="first name", max_length=40)
    last_name = models.CharField(verbose_name="second name", max_length=40)
    date_of_birth = models.DateField(verbose_name="date of birth")
    phone_number = models.CharField(verbose_name='telephone number', max_length=10)

    height = models.FloatField(verbose_name="height")
    weight = models.FloatField(verbose_name="weight")

    def __str__(self):
        return self.first_name, self.second_name


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(verbose_name="first name", max_length=40)
    last_name = models.CharField(verbose_name="second name", max_length=40)
    date_of_birth = models.DateField(verbose_name="date of birth")
    phone_number = models.CharField(verbose_name='telephone number', max_length=10)

    place_of_work = models.CharField(verbose_name="place of work", max_length=128)

    def __str__(self):
        return self.first_name, self.last_name
