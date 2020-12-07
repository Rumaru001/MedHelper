from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from ..account.views import ProfileAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('api/auth/users/<int:user_id>/profile/', ProfileAPI.as_view())

]
