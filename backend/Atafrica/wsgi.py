

import os

from django.core.wsgi import get_wsgi_application



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Atafrica.settings')

application = get_wsgi_application()

# app = application

# from gevent import monkey

# monkey.patch_all()

# from report.tasks import start_scheduler
# start_scheduler()