from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django import forms
# from django.contrib.auth.models import User
from django.db import transaction

from .models import User, Patient, Doctor


class PatientRegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # fields = ['email', 'password1', 'password2']

    email = forms.CharField(required=True)
    first_name = forms.CharField(required=True)
    second_name = forms.CharField(required=True)
    phone_number = forms.CharField(required=True)

    date_of_birth = forms.CharField(required=False)
    height = forms.FloatField(required=False)
    weight = forms.FloatField(required=False)

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)

        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')

        user.save()

        patient = Patient.objects.create(user=user)
        patient.phone_number = self.cleaned_data.get('phone_number')

        patient.date_of_birth = self.cleaned_data.get('date_of_birth')
        patient.height = self.cleaned_data.get('height')
        patient.weight = self.cleaned_data.get('weight')

        patient.save()
        return user


class DoctorRegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # fields = ['email', 'password1', 'password2']

    email = forms.CharField(required=True)
    first_name = forms.CharField(required=True)
    second_name = forms.CharField(required=True)
    phone_number = forms.CharField(required=True)

    date_of_birth = forms.CharField(required=False)
    place_of_work = forms.CharField(required=False)

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)

        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')

        user.save()

        doctor = Doctor.objects.create(user=user)
        doctor.phone_number = self.cleaned_data.get('phone_number')

        doctor.date_of_birth = self.cleaned_data.get('date_of_birth')
        doctor.place_of_work = self.cleaned_data.get('place_of_work')

        patient.save()
        return user
