from .models import Account
import random



accounts =[
    {'login':22014542,'password':'duzftxd8','server':'Deriv-Demo'},
    {'login':51135132,'password':'yym2fmut','server':'ICMarketsEU-Demo'},
    {'login':51135134,'password':'u5qoleim','server':'ICMarketsEU-Demo'}
]




def update_data():
    for i in accounts:
        user=str(i['login'])
        balance=random.uniform(50.8,150.6)
        equity=random.uniform(60.8,190.5)
        
        data={
            'login':user,
            'balance':balance,
            'equity':equity,
        }
        
        Account.objects.create(**data)
    
    
    

    
