from django.urls import path, re_path
from . import views

urlpatterns = [
    path("search/<str:searched_word>", views.search_word),
    path("search/<str:searched_word>/<int:mode>", views.search_word)
]