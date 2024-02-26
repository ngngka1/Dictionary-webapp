from django.urls import path
from . import views

urlpatterns = [
    path("search/<str:searched_word>/<int:mode>", views.search_word)
]