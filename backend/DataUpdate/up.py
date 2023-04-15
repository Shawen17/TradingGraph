from report.fields import update_data
from apscheduler.schedulers.background import BackgroundScheduler
from asgiref.sync import sync_to_async



def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_data, 'interval', minutes=2)
    scheduler.start()
