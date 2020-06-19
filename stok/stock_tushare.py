# -*- coding:utf-8 -*-

import requests as r
import os
import json
import numpy as np
import time
import math
from stok import stock_indicator as indicator
import tushare as ts

ts.set_token('bb76853dcb5378f0458929880d66ba14f7f74700601e8009e2d0117b')
host = 'http://api.tushare.pro'
token = 'bb76853dcb5378f0458929880d66ba14f7f74700601e8009e2d0117b'


def get_stock(name):
    l_stock_list = []
    if not os.path.exists(name):
        return []
    with open(name, 'r', encoding='utf-8') as f:
        for stock in f:
            if not stock.startswith('#'):
                stock = stock.strip('\n').split(',')
                if stock != '':
                    l_stock_list.append(stock[0])
    return l_stock_list


def api(api_name, params):
    res = r.post(host, json={
        'api_name': api_name,
        'params': params,
        'token': token,
    })
    return res.text


def d_week(code):
    data = api('weekly', {
        'ts_code': code,
        'start_date': '20190107',
        'end_date': '20200616',
    })
    print(data)
    return json.loads(data)['data']['items']


def d_daily(code):
    data = api('daily', {
        'ts_code': code,
        'start_date': '20190107',
        'end_date': '20200616',
    })
    print(data)
    return json.loads(data)['data']['items']


def test():
    pass


def sync_week():
    # code_list = get_stock('sha')
    # for code in code_list:
    #     try:
    #         df = ts.pro_bar(ts_code=code + '.SH', adj='qfq', start_date='20180101', end_date='20200618', freq='W')
    #         data = df.values
    #         np.save('data/week/{}'.format(code), data)
    #         time.sleep(0.2)
    #     except Exception as e:
    #         print(e)

    code_list = get_stock('sza')
    for code in code_list:
        try:
            df = ts.pro_bar(ts_code=code + '.SZ', adj='qfq', start_date='20180101', end_date='20200618', freq='W')
            data = df.values
            np.save('data/week/{}'.format(code), data)
            time.sleep(0.2)
            print(code)
        except Exception as e:
            pass


def sync_daily():
    code_list = get_stock('sha')
    for code in code_list:
        try:
            data = np.array(d_daily(code + '.SH'))
            np.save('data/daily/{}'.format(code), data)
            time.sleep(0.2)
        except Exception as e:
            pass

    code_list = get_stock('sza')
    for code in code_list:
        try:
            data = np.array(d_daily(code + '.SZ'))
            np.save('data/daily/{}'.format(code), data)
            time.sleep(0.2)
        except Exception as e:
            pass


def test2():
    kline = np.load('data/daily/600000.npy')
    sma_close_5 = indicator.sma(kline, 5)[0]
    print(sma_close_5)


def is_cross_sma(pre_close, low, high, sma):
    _min = min(pre_close, low)
    if _min < sma < high:
        return True
    return False

def is_pull():
    pass

def score_amount():
    pass

def filter_red_bar():
    pass


def filter_amount(kline, amount):
    pass


def analysis_daily(position):
    code_list = get_stock('sha')
    for code in code_list:
        kline = np.load('data/daily/{}'.format(code + '.npy'))
        if kline.shape[0] < 120:
            continue
        _open = kline[:2].astype(np.float)[:100]
        high = kline[:3].astype(np.float)[:100]
        low = kline[:4].astype(np.float)[:100]
        close = kline[:5].astype(np.float)[:100]
        pre_close = kline[:6].astype(np.float)[:100]
        vol = kline[:9].astype(np.float)[:100]
        amount = kline[:10].astype(np.float)*1000[:100]
        sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
        if amount[position] > 1 * 100000000:
            pass


def analysis_week(position):
    code_list = get_stock('sha')
    for code in code_list:
        kline = np.load('data/week/{}'.format(code + '.npy'))
        if kline.shape[0] < 120:
            continue
        close = kline[:2].astype(np.float)[:100]
        _open = kline[:3].astype(np.float)[:100]
        high = kline[:4].astype(np.float)[:100]
        low = kline[:5].astype(np.float)[:100]
        pre_close = kline[:6].astype(np.float)[:100]
        vol = kline[:9].astype(np.float)[:100]
        amount = kline[:10].astype(np.float)*1000[:100]
        sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
        if amount[position] > 1 * 100000000:
            pass

if __name__ == '__main__':
    # test()
    # test2()
    # sync_daily()
    sync_week()


