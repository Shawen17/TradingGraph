
from django.contrib import admin
from django.urls import path,re_path
from report import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',views.home,name='home'),
    path('admin/', admin.site.urls,name='admin'),
    path('api/get_data/',views.get_data,name="all_data"),
]


