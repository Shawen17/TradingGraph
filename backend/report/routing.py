from django.urls import path
from .consumers import GraphConsumer



ws_urlpatterns = [
    path('ws/chart/', GraphConsumer.as_asgi())
]