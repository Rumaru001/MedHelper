from django.shortcuts import render, get_object_or_404
from .serializers import SpecificationSerializer, AssignmentSerializer, ExtraDataSerializer, IsOwner
from rest_framework.views import APIView
from .models import Specification, Assignment, ExtraData
from rest_framework.response import Response


class AssignmentsListView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        user_id = request.user
        print(user_id)
        Assignment.objects.filter(user_id=user_id).all()
        assignments = Assignment.objects.filter(user_id=user_id).all()
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)


class AssignmentView(APIView):
    # permission_classes = [IsOwner]
    permission_classes = []

    def get(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        assignment = get_object_or_404(Assignment, pk=pk)

        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = AssignmentSerializer()
        try:
            assignment: Assignment = serializer.create(request.data)
            assignment.save()
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def put(self, request, *args, **kwargs):
        pk = kwargs["pk"]
        serializer = AssignmentSerializer()
        # try:
        serializer.update(pk, request.data)
        # except Exception:
        #     return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        assignment = get_object_or_404(Assignment, pk=pk)

        assignment.delete()
        return Response({"message": "Succesful"}, status=200)


class SpeceficatiomListView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        Specification.objects.all()
        specifications = Specification.objects.all()
        serializer = SpecificationSerializer(specifications, many=True)
        print(serializer.data)
        return Response(serializer.data)


class SpecificationView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        try:
            pk = kwargs["pk"]
        except KeyError:
            return Response({"errors": "Invalid input data"}, status=405)
        try:
            specification = Specification.objects.get(pk=pk)
        except Exception:
            return Response({"errors": "Specification does not exist"}, status=404)
        serializer = SpecificationSerializer(specification)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SpecificationSerializer()
        try:
            specification = serializer.create(request.data)
            specification.save()
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def put(self, request, *args, **kwargs):
        serializer = SpecificationSerializer()
        pk = kwargs["pk"]

        specification = get_object_or_404(Specification, pk=pk)

        try:
            specification = serializer.update(specification, request.data)
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        assignment = get_object_or_404(Specification, pk=pk)

        assignment.delete()
        return Response({"message": "Succesful"}, status=200)
