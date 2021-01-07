from .request_actions import BaseRequest, RequestType
from django.shortcuts import get_object_or_404, render
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Request
from account.models import Doctor, Profile, User
from .serializers import RequestSerializer


def get_doctor_patient(request):
    patient: User = request.user
    doctor = get_object_or_404(User, id=request.data["requested_user_id"])
    if patient.user_type == User.USER_TYPE_CHOICES[2][0]:
        patient, doctor = doctor, patient
    return doctor.doctor_profile, patient.profile


class RequestAPI(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        doctor, patient = get_doctor_patient(request)
        try:
            req = get_object_or_404(
                Request, docotor=doctor, patient=patient)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(RequestSerializer(req).data)

    def post(self, request, *args, **kwargs):
        doctor, patient = get_doctor_patient(request)

        data = {
            "doctor": doctor,
            "patient": patient,
            "type": request.data["type_of_request"]
        }

        serializer = RequestSerializer()

        try:
            req = serializer.create(data)
            req.save()
        except Exception:
            return Response({"detail": "Invalid input data"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
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

        action = RequestType[req.get_type_display()].value()  # lol

        if answer == True:
            # print(action)
            action.make(req.doctor, req.patient)
        req.delete()

        return Response({"message": "Succesful"}, status=200)
