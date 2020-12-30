from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import SpecificationSerializer, AssignmentSerializer, ExtraDataSerializer, IsOwner, TagSerializer
from rest_framework.views import APIView
from .models import Specification, Assignment, ExtraData, Tag
from rest_framework.response import Response
from .renderers import AssignmentJSONRenderer
from account.permissions import has_obj_persmission


class AssignmentsListView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = (AssignmentJSONRenderer,)

    def get(self, request, *args, **kwargs):

        size = kwargs.get('size',10^6)

        assignments = request.user.assignments.order_by("-create_date").all()[:size]
        serializer = AssignmentSerializer(assignments, many=True)
        data = {"assignments": serializer.data}
        return Response(data)


class AssignmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        assignment = get_object_or_404(Assignment, pk=pk)

        if not has_obj_persmission(request, assignment):
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = AssignmentSerializer()

        data = request.data
        data['user'] = data.get('user', request.user.id)
        data['creator'] = data.get('creator', request.user.id)
        data['editor'] = data.get('editor', request.user.id)
        print(data)

        try:
            assignment: Assignment = serializer.create(data)
            assignment.save()
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def put(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        serializer = AssignmentSerializer()

        data = request.data
        data['editor'] = request.user.id

        try:
            assignment = get_object_or_404(Assignment, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not has_obj_persmission(request, assignment):
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            serializer.update(assignment, data)
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        try:
            assignment = get_object_or_404(Assignment, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        assignment = get_object_or_404(Assignment, pk=pk)

        if not has_obj_persmission(request, assignment):
            return Response(status=status.HTTP_403_FORBIDDEN)

        assignment.data.delete()
        assignment.delete()
        return Response({"message": "Succesful"}, status=200)


class LastAssignment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        assignment = request.user.assignments.order_by("-create_date").first()
        serializer = AssignmentSerializer(assignment)
        data = {"assignment": serializer.data}
        return Response(data)


class SpeceficatiomListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        Specification.objects.all()
        specifications = Specification.objects.all()
        serializer = SpecificationSerializer(specifications, many=True)
        return Response(serializer.data)


class SpecificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        pk = kwargs["pk"]

        specification = Specification.objects.get(pk=pk)

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

        specification = get_object_or_404(Specification, pk=pk)

        specification.delete()
        return Response({"message": "Succesful"}, status=200)


class TagListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        tags = request.user.tags.order_by('-id').all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)


class TagView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        try:
            tag = get_object_or_404(Tag, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not has_obj_persmission(request, tag):
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = TagSerializer(tag)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TagSerializer()

        data = request.data
        data['user'] = request.user.id
        try:
            tag = serializer.create(data)
            tag.save()
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def put(self, request, *args, **kwargs):
        serializer = TagSerializer()
        pk = kwargs["pk"]

        try:
            tag = get_object_or_404(Tag, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not has_obj_persmission(request, tag):
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            tag = serializer.update(tag, request.data)
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        try:
            tag = get_object_or_404(Tag, pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not has_obj_persmission(request, tag):
            return Response(status=status.HTTP_403_FORBIDDEN)

        tag.delete()
        return Response({"message": "Succesful"}, status=200)
