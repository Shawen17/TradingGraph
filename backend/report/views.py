from django.shortcuts import render
from .models import Account
from .serializers import AccountSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['GET'])
def get_data(request):
    if request.method=='GET':
        datas=Account.objects.all()
        serializer=AccountSerializer(datas,many=True)
        return Response(serializer.data)


def home(request):
    url='https://catfact.ninja/fact'
    response=requests.get(url).json()
    
    jokes=response['fact']
    return render (request,'about.html',{'jokes':jokes})