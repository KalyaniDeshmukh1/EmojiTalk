from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Backend APIs
    path('api/contact/', include('contact.urls')),
    path('api/', include('users.urls')),

    # React frontend
    path('', TemplateView.as_view(template_name="index.html")),
]
