from rest_framework import permissions, serializers
from .models import Specification, Assignment, ExtraData
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

    # def create(self, validated_data):
    #     return Specification.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get("name", instance.name)
    #     instance.save()
    #     return instance


class ExtraDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraData
        fields = "__all__"

    # def create(self, validated_data):
    #     return ExtraData.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.data = validated_data.get("data", instance.data)
    #     instance.save()
    #     return instance


class AssignmentSerializer(serializers.ModelSerializer):
    data = ExtraDataSerializer()

    class Meta:
        model = Assignment
        fields = "__all__"

    def create(self, validated_data):
        data = ExtraData.objects.create(**{"data": validated_data.pop("data")})
        specification = get_object_or_404(
            Specification, pk=int(validated_data.pop("specification")))
        user = get_object_or_404(User, pk=int(validated_data.pop("user")))
        creator = get_object_or_404(
            User, pk=int(validated_data.pop("creator")))
        return Assignment.objects.create(data=data, specification=specification, user=user, creator=creator, **validated_data)

    def update(self, pk, validated_data):
        Assignment.objects.filter(pk=pk).update(**validated_data)
        # if "user" in validated_data:
        #     instance.user = get_object_or_404(
        #         User, pk=int(validated_data.pop("user")))

        # if "user" in validated_data:
        #     instance.data.data.dumps(validated_data.pop("data"))

        # instance.date = validated_data.get("date", instance.date)
        # instance.specification = get_object_or_404(
        #     Specification, pk=int(validated_data.pop("specification")))
        # instance.creator = get_object_or_404(
        #     User, pk=int(validated_data.pop("creator")))
        # instance.name = validated_data.get("name", instance.name)
        # instance.text = validated_data.get("text", instance.text)
        # instance.save()
