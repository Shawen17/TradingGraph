from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Account


@admin.register(Account)
class AccountAdmin(ModelAdmin):
    list_display = ['login','balance','equity','time']
    

