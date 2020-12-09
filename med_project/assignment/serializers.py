from django.core.validators import MaxLengthValidator
from django.db.models.fields import files
from rest_framework import permissions, serializers
from .models import Specification, Assignment, ExtraData, Tag
from django.shortcuts import get_object_or_404
#from med_project.account.permissions import IsOwner
from account.models import User


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        user = User.objects.get(pk=view.kwargs['pk'])
        if request.user == user:
            return True
        return False


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

    def create(self, validated_data):
        user = get_object_or_404(
            User, pk=int(validated_data.pop("user")))
        return Tag.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance


class ExtraDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraData
        fields = "__all__"


class AssignmentSerializer(serializers.ModelSerializer):
    data = ExtraDataSerializer()

    def validate(self, attrs):
        if not isinstance(attrs.get('name', ""), str):
            raise serializers.ValidationError({"name": "is not str type"})
        if not isinstance(attrs.get('text', ""), str):
            raise serializers.ValidationError({"text": "is not str type"})
        return super().validate(attrs)

    class Meta:
        model = Assignment
        fields = "__all__"
        depth = 1

    def create(self, validated_data):
        self.validate(validated_data)
        data = ExtraData.objects.create(**{"data": validated_data.pop("data")})
        specification = get_object_or_404(
            Specification, pk=int(validated_data.pop("specification")))

        tag_pk = validated_data.pop('tag', False)

        tag = get_object_or_404(Tag, pk=tag_pk) if tag_pk else None

        user = get_object_or_404(User, pk=int(validated_data.pop("user")))
        creator = get_object_or_404(
            User, pk=int(validated_data.pop("creator")))
        editor = get_object_or_404(
            User, pk=int(validated_data.pop("editor")))
        return Assignment.objects.create(data=data, specification=specification, user=user, creator=creator, editor=editor, tag=tag, ** validated_data)

    def update(self, pk, validated_data):
        self.validate(validated_data)
        extraData = validated_data.pop("data", False)
        assignment = get_object_or_404(Assignment, pk=pk)
        if extraData:
            eData = assignment.data
            eData.data['files'] = extraData['files']

        Assignment.objects.filter(pk=pk).update(**validated_data)
        assignment.save()
