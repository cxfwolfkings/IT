from time import sleep
from functools import wraps
import asyncio
import aiohttp

# 倒计数生成器
def countdown(n):
    while n > 0:
        yield n
        n -= 1


# Fibonacci数生成器
def fib():
    a, b = 0, 1
    while True:
        a, b = b, a + b
        yield a


# 偶数生成器
def even(gen):
    for val in gen:
        if val % 2 == 0:
            yield val


# 生成器 - 数据生产者
def countdown_gen(n, consumer):
    # 激活生成器，
    # 通俗的说就是让生成器执行到有yield关键字的地方挂起，当然也可以通过next(consumer)来达到同样的效果。
    # 如果不愿意每次都用这样的代码来“预激”生成器，可以写一个包装器来完成该操作，代码如 coroutine() 函数所示
    consumer.send(None)
    while n > 0:
        consumer.send(n)
        n -= 1
    consumer.send(None)


# 协程 - 数据消费者
def countdown_con():
    while True:
        n = yield
        if n:
            print(f'Countdown {n}')
            sleep(1)
        else:
            print('Countdown Over!')


'''
这样可以使用 `@coroutine` 装饰器对协程进行预激操作，不需要再写重复代码来激活协程。
'''
def coroutine(fn):

    @wraps(fn)
    def wrapper(*args, **kwargs):
        gen = fn(*args, **kwargs)
        next(gen)
        return gen

    return wrapper


@asyncio.coroutine
def countdown1(name, n):
    while n > 0:
        print(f'Countdown[{name}]: {n}')
        yield from asyncio.sleep(1)
        n -= 1


async def download(url):
    print('Fetch:', url)
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            print(url, '--->', resp.status)
            print(url, '--->', resp.cookies)
            print('\n\n', await resp.text())



'''
1、生成器 - 数据的生产者。
'''
def test1():
    for num in countdown(5):
        print(f'Countdown: {num}')
        sleep(1)
    print('Countdown Over!')


'''
生成器还可以叠加来组成生成器管道，代码如下所示。
'''
def test1_2():
    gen = even(fib())
    for _ in range(10):
        print(next(gen))


'''
2、协程 - 数据的消费者。
'''
def test2():
    countdown_gen(5, countdown_con())


'''
3、异步I/O - 非阻塞式I/O操作。
'''
def test3():
    loop = asyncio.get_event_loop()
    tasks = [
        countdown1("A", 10), countdown1("B", 5),
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


'''
4、async 和 await

下面的代码使用了 [AIOHTTP](https://github.com/aio-libs/aiohttp) 这个非常著名的第三方库，
它实现了HTTP客户端和HTTP服务器的功能，对异步操作提供了非常好的支持，
有兴趣可以阅读它的[官方文档](https://aiohttp.readthedocs.io/en/stable/)。
'''
def test4():
    loop = asyncio.get_event_loop()
    urls = [
        'https://www.baidu.com',
        'http://www.sohu.com/',
        'http://www.sina.com.cn/',
        'https://www.taobao.com/',
        'https://www.jd.com/'
    ]
    tasks = [download(url) for url in urls]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


if __name__ == '__main__':
    test1()