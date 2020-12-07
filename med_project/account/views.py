from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ProfileSerializer
from .models import User, Profile


class ProfileAPI(APIView):
    permission_classes = permissions.IsAuthenticated

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['user_id'])
        profile_serializer = ProfileSerializer(user.profile)
        return Response(profile_serializer.data)

    def put(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['user_id'])
        profile_serializer = ProfileSerializer(user.profile, data=request.data)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, requst, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['user_id'])
        user.profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
