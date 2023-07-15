# from models import Account
import MetaTrader5 as mt5
import multiprocessing
import time,os
import threading



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


class ExtractDataThread(threading.Thread):

    # def __init__(self,arr):
    #     self.chunk = chunk
        
    
    def run(self,chunk):
        try:
            print('Execution started')
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

                print(data)            
                # Account.objects.create(**data)
        except Exception as e:
            print(e)





def split_list(arr):
    n=len(arr)
    mid= n//os.cpu_count()
    first_list=arr[:mid]
    second_list=arr[mid:2*mid]
    third_list=arr[2*mid:3*mid]
    fourth_list=arr[3*mid:]
    return first_list,second_list,third_list,fourth_list

def update_data(chunk):
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
            
        Account.objects.create(**data)
        print(data)
    


def execute():
    a,b,c,d = split_list(accounts)
    # starttime= time.time()
    # pool=multiprocessing.Pool(processes=4)
    # task_list = [a,b,c,d]
    # pool.map(update_data, task_list)
    # pool.close()
    # pool.join()
    # endtime=time.time()
    # print(endtime-starttime)
    p1 = multiprocessing.Process(target=update_data, args=(a, ))
    p2 = multiprocessing.Process(target=update_data, args=(b, ))
    p3 = multiprocessing.Process(target=update_data, args=(c, ))
    p4 = multiprocessing.Process(target=update_data, args=(d, ))

    starttime= time.time()
    # starting process 1
    p1.start()
    # starting process 2
    p2.start()
    p3.start()
    p4.start()
    # wait until process 1 is finished
    p1.join()
    # wait until process 2 is finished
    p2.join()
    p3.join()
    p4.join()
    # both processes finished
    endtime=time.time()
    print(endtime-starttime)


# def execute():


#     if __name__ == "__main__":
        
#         # creating processes
#         p1 = multiprocessing.Process(target=update_data, args=(a, ))
#         p2 = multiprocessing.Process(target=update_data, args=(b, ))
#         p3 = multiprocessing.Process(target=update_data, args=(c, ))
#         p4 = multiprocessing.Process(target=update_data, args=(d, ))

#         starttime= time.time()
#         # starting process 1
#         p1.start()
#         # starting process 2
#         p2.start()
#         p3.start()
#         p4.start()
#         # wait until process 1 is finished
#         p1.join()
#         # wait until process 2 is finished
#         p2.join()
#         p3.join()
#         p4.join()
#         # both processes finished
#         endtime=time.time()
#         print(endtime-starttime)

