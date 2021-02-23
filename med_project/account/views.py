from .filters import DoctorFilter, UserFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    CustomTokenObtainPairSerializer, DocotorSerializer, DoctorSerializerPut, DoctorUserSerializer, RegisterSerializer, ChangePasswordSerializer)
from django.core.paginator import EmptyPage, Paginator
from django.shortcuts import render, get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ProfileSerializer, ProfileSerializerPut
from .models import Doctor, User, Profile, UserType, get_user_by_type

import json


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()
    serializer_class = RegisterSerializer

    def post(self, request):
        user = User(email=self.request.user)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LogoutApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer


class HelloWorldView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"hello": "world"}, status=status.HTTP_200_OK)


class ProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user: User = request.user
        profile_serializer = ProfileSerializer(get_user_by_type(user))
        data = profile_serializer.data
        data["number_of_requests"] = len(user.incoming_requests.all())
        return Response(data)

    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        profile_serializer = ProfileSerializerPut(user.profile, data=data)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DoctorAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user: User = request.user
        profile_serializer = DocotorSerializer(get_user_by_type(user))
        data = profile_serializer.data
        data["number_of_requests"] = len(user.incoming_requests.all())
        return Response(data)

    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        print(data)
        profile_serializer = DoctorSerializerPut(
            get_user_by_type(user), data=data)
        if profile_serializer.is_valid(False):
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        print(profile_serializer.errors)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = request.user
        get_user_by_type(user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DeleteUserAPI(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user: User = request.user
        user.delete()
        return Response({"detail": "Successful"}, status=status.HTTP_200_OK)


class DoctorList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if not isinstance(get_user_by_type(request.user), Profile):
            return Response({"detail": "Valid user type"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        doctors = Doctor.objects.all()
        filtered = DoctorFilter(request.GET, queryset=doctors, request=request)
        paginator = Paginator(filtered.qs.order_by(
            'id'), request.GET.get("per_page", 10))
        try:
            page_obj = paginator.get_page(request.GET.get("current_page", 1))
        except EmptyPage:
            print("ERROR")
            page_obj = paginator.get_page(1)

        return Response({"obj_list": DoctorUserSerializer(page_obj.object_list, many=True, context={'request': request}).data,
                         "pages_number": paginator.num_pages,
                         "current_page": page_obj.number})


class PatientList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_type = get_user_by_type(request.user)
        if not isinstance(user_type, Doctor):
            return Response({"detail": "Valid user type"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        patients = user_type.patients
        filtered = UserFilter(request.GET, queryset=patients, request=request)
        paginator = Paginator(filtered.qs.order_by(
            'id'), request.GET.get("per_page", 10))
        try:
            page_obj = paginator.get_page(request.GET.get("current_page", 1))
        except EmptyPage:
            print("ERROR")
            page_obj = paginator.get_page(1)

        return Response({"obj_list": ProfileSerializer(page_obj.object_list, many=True, context={'request': request}).data,
                         "pages_number": paginator.num_pages,
                         "current_page": page_obj.number})
