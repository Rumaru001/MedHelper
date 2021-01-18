from .request_actions import BaseRequest, RequestType
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Request
from account.models import Doctor, Profile, User, get_user_by_type
from .serializers import RequestSerializer


def get_sender_reciever(request):
    reciever_id = int(request.data.get('reciever_id'))
    return get_user_by_type(request.user), get_user_by_type(get_object_or_404(User, id=reciever_id))


class RequestAPI(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        try:
            req = request.user.incoming_requests.all()
        except:
            return Response({"detail": "Requests not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(RequestSerializer(req, many=True).data)

    def post(self, request, *args, **kwargs):
        try:
            sender, reciever = get_sender_reciever(request)
        except:
            return Response({'detail': "Invalid input"},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)
        type = request.data["type_of_request"]

        if not RequestType[Request.Request_Type(
                type).name].value.validate(sender, reciever):
            return Response({'detail': "Action not allowed"},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)

        try:
            data = {
                "sender": sender.user,
                "reciever": reciever.user,
                "type": Request.Request_Type[Request.Request_Type(type).name]}

            serializer = RequestSerializer()

            if not serializer.validate(data):
                print(data)
                raise Exception

        except Exception:
            return Response({"detail": "Invalid input data"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        try:
            req = serializer.create(data)
            req.save()
        except:
            return Response({"detail": "Request already exists"}, status=status.HTTP_409_CONFLICT)

        return Response({"detail": "Succesful"}, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        try:
            req = get_object_or_404(
                Request, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            answer = request.data.get("answer")
        except KeyError:
            return Response({"errors": "Invalid input data"}, status=405)

        action = RequestType[Request.Request_Type(
            req.type).name].value()  # lol

        if answer == True:
            action.make(req.sender, req.reciever)

        req.delete()

        return Response({"message": "Succesful"}, status=200)
