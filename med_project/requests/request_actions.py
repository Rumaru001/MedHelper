from abc import ABC
from enum import Enum


class BaseRequest(ABC):

    def get_description(self, user):
        return "This is base request class"

    def make(self, user1, user2):
        pass


class AddDoctor(BaseRequest):

    def get_description(self, user):
        return f"Do you want to add {user} ({user.get_user_type_display()})?"

    def make(self, doctor, patient):
        # print("Hello")
        doctor.patients.add(patient)
        doctor.save()


class RemoveDoctor(BaseRequest):

    def get_description(self, user):
        return f"Do you want to remove {user} ({user.get_user_type_display()})?"

    def make(self, doctor, patient):
        doctor.patients.remove(patient)
        doctor.save()


class RequestType(Enum):
    ADD_DOCTOR = AddDoctor
    REMOVE_DOCTOR = RemoveDoctor
