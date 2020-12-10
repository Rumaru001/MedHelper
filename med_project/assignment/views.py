from django.shortcuts import render, get_object_or_404
from .serializers import SpecificationSerializer, AssignmentSerializer, ExtraDataSerializer, IsOwner, TagSerializer
from rest_framework.views import APIView
from .models import Specification, Assignment, ExtraData, Tag
from rest_framework.response import Response
from .renderers import AssignmentJSONRenderer


class AssignmentsListView(APIView):
    permission_classes = []
    renderer_classes = (AssignmentJSONRenderer,)

    def get(self, request, *args, **kwargs):

        assignments = request.user.assignments.order_by("-create_date").all()
        serializer = AssignmentSerializer(assignments, many=True)
        data = {"assignments": serializer.data}
        return Response(data)


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
            serializer.update(pk, data)
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        assignment = get_object_or_404(Assignment, pk=pk)
        assignment.data.delete()
        assignment.delete()
        return Response({"message": "Succesful"}, status=200)


class SpeceficatiomListView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        Specification.objects.all()
        specifications = Specification.objects.all()
        serializer = SpecificationSerializer(specifications, many=True)
        return Response(serializer.data)


class SpecificationView(APIView):
    permission_classes = []

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
    permission_classes = []

    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        Tag.objects.filter(user_id=user_id).all()
        tags = Tag.objects.filter(user_id=user_id).all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)


class TagView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        tag = get_object_or_404(Tag, pk=pk)

        serializer = TagSerializer(tag)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TagSerializer()
        data = request.data
        data['user'] = request.user.id
        # try:
        tag = serializer.create(data)
        tag.save()
       # except Exception:
        #    return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def put(self, request, *args, **kwargs):
        serializer = TagSerializer()
        pk = kwargs["pk"]
        tag = get_object_or_404(Tag, pk=pk)

        try:
            tag = serializer.update(tag, request.data)
        except Exception:
            return Response({"errors": "Invalid input data"}, status=405)
        return Response({"message": "Succesful"}, status=200)

    def delete(self, request, *args, **kwargs):
        pk = kwargs["pk"]

        tag = get_object_or_404(Tag, pk=pk)

        tag.delete()
        return Response({"message": "Succesful"}, status=200)
