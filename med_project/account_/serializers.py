from allauth.account.adapter import get_adapter
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_patient', 'is_doctor')


class CustomRegisterSerializer(RegisterSerializer):
    is_patient = serializers.BooleanField()
    is_doctor = serializers.BooleanField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_patient', 'is_doctor')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_patient': self.validated_data.get('is_patient', ''),
            'is_doctor': self.validated_data.get('is_doctor', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_patient = self.cleaned_data.get('is_patient')
        user.is_doctor = self.cleaned_data.get('is_doctor')
        user.save()
        adapter.save_user(request, user, self)
        return user
