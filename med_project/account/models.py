from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager)
from django.db import models
from django.db import transaction


class UserManager(BaseUserManager):

    def get_by_natural_key(self, email):
        return self.get(email=email)

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email,and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password=password, **extra_fields)


class PatientManager(BaseUserManager):

    def create_patient(self, first_name, last_name, email, phone_number, height, weight, password=None):
        if email is None:
            raise TypeError('Users must have an email address.')
        patient = Patient(first_name=first_name, last_name=last_name,
                          email=self.normalize_email(email),
                          phone_number=phone_number,
                          height=height, weight=weight)
        patient.set_password(password)
        patient.save()
        return patient


class DoctorManager(BaseUserManager):

    def create_doctor(self, first_name, last_name, email, place_of_work, password=None):
        if email is None:
            raise TypeError('Users must have an email address.')
        doctor = Employee(first_name=first_name, last_name=last_name,
                          email=self.normalize_email(email),
                          place_of_work=place_of_work)
        doctor.set_password(password)
        doctor.save()
        return doctor


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)

    first_name = models.CharField(verbose_name="first name", max_length=30)
    last_name = models.CharField(verbose_name="second name", max_length=30)
    # date_of_birth = models.DateField(verbose_name="date of birth")

    # django required fields
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default='1')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        dt = datetime.now() + timedelta(days=days)
        token = jwt.encode({
            'id': user_id,
            'exp': int(time.mktime(dt.timetuple()))
        }, settings.SECRET_KEY, algorithm='HS256')
        return token.decode('utf-8')

    def get_full_name(self):
        return (self.first_name + ' ' + self.last_name)

    def get_short_name(self):
        return self.first_name

    def natural_key(self):
        return (self.first_name, self.last_name)


class Patient(User, PermissionsMixin):
    phone_number = models.CharField(max_length=10)
    height = models.FloatField(verbose_name="height")
    weight = models.FloatField(verbose_name="weight")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    objects = PatientManager()

    def __str__(self):
        return self.first_name


class Doctor(models.Model):
    place_of_work = models.CharField(verbose_name="place of work", max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'place_of_work']

    objects = DoctorManager()

    def __str__(self):
        return self.first_name
