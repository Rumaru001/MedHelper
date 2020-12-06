from django.shortcuts import render
from .serializers import SpecificationSerializer, AssignmentSerializer, ExtraDataSerializer, IsOwner
from rest_framework.views import APIView
from .models import Specification, Assignment, ExtraData
from django.http import JsonResponse


class AssignmentsListView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        user_id = 2
        Assignment.objects.filter(user_id=user_id).all()
        assignments = Assignment.objects.filter(user_id=user_id).all()
        serializer = AssignmentSerializer(assignments, many=True)
        return JsonResponse(serializer.data)


class AssignmentsDetailView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        try:
            pk = request.data["pk"]
        except ValueError:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        try:
            assignment = Assignment.objects.get(pk=pk)
        except Exception:
            return JsonResponse({"errors": "Assignment does not exist"}, status=404)
        serializer = AssignmentSerializer(assignment)
        return JsonResponse(serializer.data)


class AssignmentCreateView(APIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        serializer = AssignmentSerializer()
        try:
            assignment = serializer.create(request.data)
            assignment.save()
        except Exception:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        return JsonResponse({"message": "Succesful"}, status=200)


class AssignmentUpdateView(APIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        serializer = AssignmentSerializer()
        try:
            assignment = serializer.update(request.data)
        except Exception:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        return JsonResponse({"message": "Succesful"}, status=200)


class AssignmentDeleteView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        try:
            pk = request.data["pk"]
        except ValueError:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        try:
            assignment = Assignment.objects.get(pk=pk)
        except Exception:
            return JsonResponse({"errors": "Assignment does not exist"}, status=404)
        assignment.delete()
        return JsonResponse({"message": "Succesful"}, status=200)


class SpeceficatiomListView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        Specification.objects.all()
        specifications = Specification.objects.all()
        serializer = SpecificationSerializer(specifications, many=True)
        return JsonResponse(serializer.data)


class SpecificationCreateView(APIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        serializer = SpecificationSerializer()
        try:
            specification = serializer.create(request.data)
            specification.save()
        except Exception:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        return JsonResponse({"message": "Succesful"}, status=200)


class SpecificationUpdateView(APIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        serializer = SpecificationSerializer()
        try:
            specification = serializer.update(request.data)
        except Exception:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        return JsonResponse({"message": "Succesful"}, status=200)


class SpecificatiomDeleteView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        try:
            pk = request.data["pk"]
        except ValueError:
            return JsonResponse({"errors": "Invalid input data"}, status=405)
        try:
            assignment = Assignment.objects.get(pk=pk)
        except Exception:
            return JsonResponse({"errors": "Assignment does not exist"}, status=404)
        assignment.delete()
        return JsonResponse({"message": "Succesful"}, status=200)
