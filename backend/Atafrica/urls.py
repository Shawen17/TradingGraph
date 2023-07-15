
from django.contrib import admin
from django.urls import path,include
from report import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',views.home,name='home'),
    path('chart/', include('report.urls')),
    path('admin/', admin.site.urls,name='admin'),
    path('api/get_data/',views.get_data,name="all_data"),
]


