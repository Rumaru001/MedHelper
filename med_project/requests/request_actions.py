from enum import Enum
from account.models import Profile, Doctor


class BaseRequest:

    @staticmethod
    def get_description(user):
        return "This is base request class"

    def make(self, user1, user2):
        pass

    @staticmethod
    def validate(sender, reciever):
        return (isinstance(sender, Profile) and isinstance(reciever, Doctor)) or \
            (isinstance(sender, Doctor) and isinstance(reciever, Profile))


class AddDoctor(BaseRequest):

    def get_description(user):
        return f"Do you want to add {user} ({user.get_user_type_display()})?"

    def make(self, sender, reciever):
        # print("Hello")
        sender.patients.add(reciever)
        sender.save()


class RemoveDoctor(BaseRequest):

    def get_description(user):
        return f"Do you want to remove {user} ({user.get_user_type_display()})?"

    def make(self, sender, reciever):
        sender.patients.remove(reciever)
        sender.save()


class RequestType(Enum):
    ADD_DOCTOR = AddDoctor
    REMOVE_DOCTOR = RemoveDoctor
