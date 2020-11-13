from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#substituting-a-custom-user-model

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, first_name, second_name, date_of_birth ,password=None):

        if not email:
            raise ValueError("There is no email")

        if not username:
            return ValueError("There is no username")

        #todo validation

        user: BaseUser = self.model(
                email = self.normalize_email(email),
                username = username,
                first_name = first_name,
                second_name = second_name,
                date_of_birth = date_of_birth
        )

        user.set_password(password)
        user.save(using=self._db)

        return user
        
    def create_superuser(self, email, username, first_name, second_name, date_of_birth ,password=None):

        user = self.create_user(
                email=email,
                username=username,
                first_name = first_name,
                second_name = second_name,
                date_of_birth = date_of_birth,
                password=password)
        
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class BaseUser(AbstractBaseUser):
    ADMIN = 1000
    PATIENT = 1
    DOCTOR = 2
    USER_STATUS_CHOICES = (
        (1000,'admin'),
        (1,'patient'),
        (2,'doctor')
    )

    email           = models.EmailField(verbose_name='email', max_length=60, unique=True, blank=False)
    username        = models.CharField(max_length=30, unique=True, blank=False)

    # django required fields
    date_joined     = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name="last login", auto_now=True)

    first_name      = models.CharField(verbose_name="first name", max_length=30, blank=False)
    second_name     = models.CharField(verbose_name="second name", max_length=30, blank=False)
    date_of_birth   = models.DateField(verbose_name="date of birth", blank= True)

    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)

    #user_status = models.CharField(max_length=20 , choices=USER_STATUS_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name', 'second_name', 'date_of_birth']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_lebel):
        return True


class Patient(BaseUser):
    
    height          = models.FloatField(verbose_name="height", blank= True)
    weight          = models.FloatField(verbose_name="weight", blank= True)


class Doctor(BaseUser):
    place_of_work   = models.CharField(verbose_name="place of work", max_length=128, blank=True)