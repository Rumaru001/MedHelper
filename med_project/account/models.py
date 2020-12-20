import jwt
from django.conf import settings
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin)
from django.conf import settings


class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a `User`.
    All we have to do is override the `create_user` function which we will use
    to create `User` objects.
    """

    def create_user(self, email, password):
        """Create and return a `User` with an email and password."""

        if email is None:
            raise TypeError('Users must have an email address.')

        if password is None:
            raise TypeError('Users must have a password.')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # USER_TYPE_CHOICES = (
    #     (1, 'patient'),
    #     (2, 'doctor'),
    # )

    email = models.EmailField(db_index=True, unique=True)

    # user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        """ Set a table name. """
        db_table = 'user'


def get_upload_path(instance, filename):
    return "user_img_{id}/{file}".format(id=instance.user.id, file=filename)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='profile')

    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )

    name = models.CharField(max_length=30, blank=True)
    surname = models.CharField(max_length=30, blank=True)
    contact_number = models.CharField(max_length=10, unique=True, blank=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES, blank=True)
    addres = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    blood = models.CharField(max_length=30, blank=True)

    image = models.ImageField(default='profile_img.png', upload_to=get_upload_path, blank=True)

    class Meta:
        """ Set a table name. """
        db_table = 'profile'
