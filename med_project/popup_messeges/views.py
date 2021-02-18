from .models import Message
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import MessageSerializer
from rest_framework import status


class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        messeges = user.messeges

        serializer = MessageSerializer(messeges, many=True)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        try:
            messege = get_object_or_404(Message, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        messege.delete()

        return Response({"message": "Succesful"}, status=200)
