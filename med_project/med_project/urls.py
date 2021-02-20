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
    path('api/assignment/', include('assignment.urls')),
    path('api/messages/', include('popup_messeges.urls'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


def run():
    from background_task import background
    from recommendation.views import HeartDisease
    from popup_messeges.models import Message

    time = 60

    @background(schedule=time)
    def pr():
        print('Creating model')
        model = HeartDisease()
        print("Model created\nPreparing data and suggesting recommandations")

        res = model.predict()
        print(res)

        for user_id, flag in res:
            if flag:
                Message(
                    user_id=user_id, text="Recommandation: you should visit a cardiologist").save()
        print(
            f"Recomandation system finished successfully \nlen: {len(res)}")

    from datetime import datetime, timedelta
    # pr(repeat=60, repeat_until=datetime.now() + timedelta(seconds=185))
    pr()


run()
