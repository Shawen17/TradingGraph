# from models import Account
# import random
# # import MetaTrader5 as mt5
# import multiprocessing
# from multiprocessing import Manager
# import time,os


# # mt5.initialize()

# accounts =[
#     {'login':5014059057,'password':'7pfsldmu','server':'MetaQuotes-Demo'},
#     {'login':68575110,'password':'4qbhrvln','server':'MetaQuotes-Demo'},
#     {'login':5012400620,'password':'4wtzfzum','server':'MetaQuotes-Demo'},
#     {'login':68575228,'password':'khjwa4za','server':'MetaQuotes-Demo'},
#     {'login':70255606,'password':'2tywppvr','server':'MetaQuotes-Demo'},
#     {'login':5014059261,'password':'czuvv5rl','server':'MetaQuotes-Demo'},
#     {'login':5014059298,'password':'u8aqryvi','server':'MetaQuotes-Demo'},
#     {'login':70255736,'password':'oqmu8dmt','server':'MetaQuotes-Demo'},
#     {'login':70255775,'password':'8obbwinv','server':'MetaQuotes-Demo'},
#     {'login':5014059428,'password':'mci5jagf','server':'MetaQuotes-Demo'},
# ]



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
        print(result)
    
    Account.objects.bulk_create(result)
    

# def consumer(queue,numb):
#     total=[]
#     for _ in range(numb):
#         value=queue.get()
#         # if value is None:
#         #     break
#         total.append(value)
#         time.sleep(0.001)
#     print(total)
    
    






# if __name__ == "__main__":
#     # multiprocessing.freeze_support()
#     # creating processes
#     print('about to start')
#     starttime= time.time()
#     # queue=multiprocessing.Queue()
#     # producer_processes=[multiprocessing.Process(target=producer,args=(queue,i)) for i in accounts]
#     # consumer_processes=multiprocessing.Process(target=consumer,args=(queue,len(accounts)))
#     num_workers=multiprocessing.cpu_count()
#     a,b,c,d = split_list(accounts)
#     numb=(a,b,c,d)
    
#     with multiprocessing.Pool(num_workers) as pool:
#         results=pool.map(update_data,numb)
    
        
        
        
#     # for process in producer_processes:
#     #     process.start()
    
#     # consumer_processes.start()
        

#     # for process in producer_processes:
#     #     process.join()

    

#     # consumer_processes.join()
#     # p1 = multiprocessing.Process(target=update_data, args=(a,))
#     # p2 = multiprocessing.Process(target=update_data, args=(b,))
#     # p3 = multiprocessing.Process(target=update_data, args=(c,))
    
#     # p1.start()
#     # p2.start()
#     # p3.start()
    
#     # p1.join()
#     # p2.join()
#     # p3.join()
    
    
#     endtime=time.time()
#     print(endtime-starttime)

