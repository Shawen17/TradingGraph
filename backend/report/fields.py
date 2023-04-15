from .models import Account
import random
import MetaTrader5 as mt5



accounts =[
    {'login':68575110,'password':'4qbhrvln','server':'MetaQuotes-Demo'},
    {'login':5012400620,'password':'4wtzfzum','server':'MetaQuotes-Demo'},
    {'login':68575228,'password':'khjwa4za','server':'MetaQuotes-Demo'}
]




def update_data():
    for i in accounts:
        
        user=i['login']
        mt5.login(i['login'],i['password'],i['server'])
        info = mt5.account_info()
        balance=info.balance
        equity=info.equity
        # balance=random.uniform(50.8,150.6)
        # equity=random.uniform(60.8,190.5)
        
        data={
            'login':user,
            'balance':balance,
            'equity':equity,
        }
        
        Account.objects.create(**data)
    
    
    

    
