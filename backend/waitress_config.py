from gevent import monkey
import os
monkey.patch_all()

from waitress import serve
from Atafrica.wsgi import application



serve(application, host='localhost', port=8000)
