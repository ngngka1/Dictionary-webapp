from django.contrib import admin
from django.urls import path, include
from .views import MyTokenObtainPairView
from . import views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.get_routes),
    path('token/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]
