# from report.fields import execute
# from apscheduler.schedulers.background import BackgroundScheduler
# from asgiref.sync import sync_to_async



# def start():
#     scheduler = BackgroundScheduler()
#     scheduler.add_job(execute, 'interval', minutes=20)
#     scheduler.start()

# from apscheduler.schedulers.blocking import BlockingScheduler
# import subprocess

# def run_script():
#     # Execute your Python script using subprocess or any other method
#     subprocess.call(["python", "./report/updateData.py"])

# # Create an instance of the scheduler
# scheduler = BlockingScheduler()

# # Schedule the script to run every hour
# scheduler.add_job(run_script, 'interval', minutes=5)

# # Start the scheduler
# scheduler.start()