from django.db import models
from datetime import datetime



class Account(models.Model):
    login = models.CharField(max_length=30)
    balance = models.DecimalField(max_digits=10,decimal_places=2)
    equity= models.DecimalField(max_digits=10,decimal_places=2)
    time= models.DateTimeField(auto_now=True)

    def __str__(self):

        return self.login
