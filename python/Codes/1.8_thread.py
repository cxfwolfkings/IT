import threading
import time

def Func1(i):
    time.sleep(1)
    for item in range(100):
        print(i, item)

def Demo1():
    t1 = threading.Thread(target=Func1,args=(1,))
    t1.start()
    t1.join(1) # 最多停顿1s
    
    #t2 = threading.Thread(target=Func,args=(2,))
    # #t2.start()
    # #t2.join() # 串行化
    print('over.')

sb=1
lock = threading.Lock()
def Func2(i):
    #lock.acquire()
    global sb
    sb+=1
    time.sleep(1)
    print(sb)
    #lock.release()

class MyThread(threading.Thread):
    def run(self):
        print('游戏开始...' + self.name)
        threading.Thread.run(self)

def Demo2():
    t1=MyThread(target=Func2,args=(1,))
    t1.start()
    t2=MyThread(target=Func2,args=(1,))
    t2.start()

if __name__ == '__main__':
    Demo2()
