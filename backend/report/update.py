from django.core.management.base import BaseCommand
from django.utils import timezone
from .models import Account
from datetime import timedelta

accounts =[
    {'login':22014542,'password':'duzftxd8','server':'Deriv-Demo'},
    {'login':51135132,'password':'yym2fmut','server':'ICMarketsEU-Demo'},
    {'login':51135134,'password':'u5qoleim','server':'ICMarketsEU-Demo'}
]

class Command(BaseCommand):
    help = 'Displays current time'

    def handle(self, *args, **kwargs):
        for i in accounts:
            user=str(i['login'])
            # mt5.login(i['login'],i['password'],i['server'])
            # account_info=mt5.account_info()
            # balance=account_info.balance
            # equity=account_info.equity
            # since i can't get any tangible info from the trading accounts provided
            balance=random.uniform(50.8,150.6)
            equity=random.uniform(60.8,190.5)
            
            data={
                'login':user,
                'balance':balance,
                'equity':equity,
            }
            
            Account.objects.create(**data)