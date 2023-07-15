from __future__ import absolute_import, unicode_literals
import os
from celery import Celery





os.environ.setdefault('DJANGO_SETTINGS_MODULE','Atafrica.settings')


app = Celery('Atafrica',include=['report.tasks'])

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'get_data_3s':{
        'task':'report.tasks.my_background_task',
        'schedule': 60.0
    },
    'update_chart_1s':{
        'task':'report.tasks.update_chart',
        'schedule': 60.0
    },
 
}


 
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request|r}')
