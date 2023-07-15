from asgiref.sync import async_to_sync
from celery import shared_task
from gevent.pool import Pool
import MetaTrader5 as mt5
from .serializers import AccountSerializer
import os 
import time
from django.http import HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import requests

from .models import Account
import time

channel_layer = get_channel_layer()

accounts =[
    {'login':5014059057,'password':'7pfsldmu','server':'MetaQuotes-Demo'},
    {'login':68575110,'password':'4qbhrvln','server':'MetaQuotes-Demo'},
    {'login':5012400620,'password':'4wtzfzum','server':'MetaQuotes-Demo'},
    {'login':68575228,'password':'khjwa4za','server':'MetaQuotes-Demo'},
    {'login':70255606,'password':'2tywppvr','server':'MetaQuotes-Demo'},
    {'login':5014059261,'password':'czuvv5rl','server':'MetaQuotes-Demo'},
    {'login':5014059298,'password':'u8aqryvi','server':'MetaQuotes-Demo'},
    {'login':70255736,'password':'oqmu8dmt','server':'MetaQuotes-Demo'},
    {'login':70255775,'password':'8obbwinv','server':'MetaQuotes-Demo'},
    {'login':5014059428,'password':'mci5jagf','server':'MetaQuotes-Demo'},
]


def split_list(arr):
    n=len(arr)
    mid= n//os.cpu_count()
    first_list=arr[:mid]
    second_list=arr[mid:2*mid]
    third_list=arr[2*mid:3*mid]
    fourth_list=arr[3*mid:]
    return first_list,second_list,third_list,fourth_list

def update_data(chunk):
    result=[]
    
    for i in chunk:
        user=i['login']
        mt5.login(i['login'],i['password'],i['server'])
        info = mt5.account_info()
        balance=info.balance
        equity=info.equity
                    
        data={
            'login':user,
            'balance':balance,
            'equity':equity,
                }
        result.append(data)
    instances = [Account(**item) for item in result]
    Account.objects.bulk_create(instances)

@shared_task
def my_background_task():
    a,b,c,d = split_list(accounts)
    numb=(a,b,c,d)
    pool=Pool(4)
    results=pool.map(update_data,numb)
    
    
    
@shared_task
def update_chart():
    datas=Account.objects.all().order_by('-time')
    serializer=AccountSerializer(datas,many=True)
    chart_data = serializer.data
    async_to_sync(channel_layer.group_send)('chart',{'type':'send_chart_data','message':chart_data})



# def start_scheduler():
#     scheduler = BackgroundScheduler()
#     scheduler.add_job(my_background_task, 'interval', seconds=60)  # Run task every 10 seconds
#     scheduler.start()
