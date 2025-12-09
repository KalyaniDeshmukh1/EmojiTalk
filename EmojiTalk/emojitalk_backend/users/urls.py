# users/urls.py
from django.urls import path
from .views import save_feedback
from .views import SignupView, LoginView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('feedback/', save_feedback, name='save_feedback'),
    path('login/', LoginView.as_view(), name='login'),
]
