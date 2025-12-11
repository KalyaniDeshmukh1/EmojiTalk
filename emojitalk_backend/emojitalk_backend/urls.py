from django.contrib import admin
from django.urls import path, include
from contact.views import home 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', include('contact.urls')),  # <- your contact API
    path('api/', include('users.urls')),
    path('', home),
]
