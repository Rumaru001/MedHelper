from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm

from .forms import PatientRegisterForm, DoctorRegisterForm


# Create your views here.
def index(request):
    return HttpResponse('hello it`s me')


def register(request):
    return render(request, 'register.html')


def register_page(request):
    form = PatientRegisterForm()
    context = {'form': form}

    if request.method == 'POST':
        form = PatientRegisterForm(request.POST)
        if form.is_valid():
            form.save()

    return render(request, 'PatientRegister.html', context)


def login_page(request):
    context = {}

    return render(request, 'login.html', context)
