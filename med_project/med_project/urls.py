from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    # re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
    path('api/auth/', include('account.urls')),
    path('api/request/', include('requests.urls')),
    path('api/assignment/', include('assignment.urls'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
