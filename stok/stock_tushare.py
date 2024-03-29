# -*- coding:utf-8 -*-

import requests as r
import os
import json
import numpy as np
import time
import math
from stok import stock_indicator as indicator
import tushare as ts
from datetime import datetime
from stok.trigger import trigger1
from stok.trigger import week_filter
import os

ts.set_token('bb76853dcb5378f0458929880d66ba14f7f74700601e8009e2d0117b')
host = 'http://api.tushare.pro'
token = 'bb76853dcb5378f0458929880d66ba14f7f74700601e8009e2d0117b'
pro = ts.pro_api(token)


def get_stock(name):
    l_stock_list = []
    if not os.path.exists(name):
        return []
    with open(name, 'r', encoding='utf-8') as f:
        for stock in f:
            if stock.startswith('#') or stock == '':
                continue
            stock = stock.strip('\n').split(',')
            if len(stock) > 1 and ('st' in stock[1] or 'ST' in stock[1]):
                continue
            if stock[0].startswith('688'):
                continue
           # if stock[0].startswith('300'):
           #    continue
            l_stock_list.append(stock[0])
    return l_stock_list


def api(api_name, params):
    res = r.post(host, json={
        'api_name': api_name,
        'params': params,
        'token': token,
    })
    return res.text


def today():
    # return '20201118'
    return datetime.now().strftime('%Y%m%d')


def d_week(code):
    # data = api('weekly', {
    #     'ts_code': code,
    #     'start_date': '20190107',
    #     'end_date': today(),
    # })
    # print(data)
    # return json.loads(data)['data']['items']
    data = pro.weekly(ts_code=code, start_date='20190107', end_date=today())
    return data.values


def d_daily(code):
    # data = api('daily', {
    #     'ts_code': code,
    #     'start_date': '20190107',
    #     'end_date': today(),
    # })
    data = pro.daily(ts_code=code, start_date='20190107', end_date=today())
    return data.values


def test():
    pass


def sync_week():
    code_list = get_stock('sha')
    for code in code_list:
        try:
            data = d_week(code + '.SH')
            data = data[:, [0, 1, 3, 4, 5, 2, 6, 7, 8, 9, 10]]
            np.save('data/week/{}'.format(code), data)
            time.sleep(0.15)
        except Exception as e:

            pass

    code_list = get_stock('sza')
    for code in code_list:
        try:
            data = d_week(code + '.SZ')
            data = data[:, [0, 1, 3, 4, 5, 2, 6, 7, 8, 9, 10]]
            np.save('data/week/{}'.format(code), data)
            time.sleep(0.15)
        except Exception as e:
            pass


def sync_daily():
    code_list = get_stock('sha')
    for code in code_list:
        try:
            print(code)
            data = d_daily(code + '.SH')
            np.save('data/daily/{}'.format(code), data)
            time.sleep(0.15)
        except Exception as e:
            print(e)
            pass

    code_list = get_stock('sza')
    for code in code_list:
        try:
            print(code)
            data = d_daily(code + '.SZ')
            np.save('data/daily/{}'.format(code), data)
            time.sleep(0.15)
        except Exception as e:
            pass

# 60日 week line
filter_stk1_result = []


def filter_stk1():
    if len(filter_stk1_result) != 0:
        return filter_stk1_result
    all_stk = get_stock('sha') + get_stock('sza')
    result = []
    for code in all_stk:
        kline = np.load('data/week/{}'.format(code + '.npy'), allow_pickle=True)
        if kline.shape[0] < 65:
            continue
        sma_close_5, sma_close_10, sma_close_60 = indicator.sma_week(kline, 5, 10, 60)
        if sma_close_60[0] < sma_close_5[0] < 40 and sma_close_10[0] > sma_close_60[0]:
            print(code)
            result.append(code)
    return result

def xxx():

    pass


# if kline.shape[0] < 120:
#             continue
#         s_open = kline[:, 2].astype(np.float)[:100]
#         s_high = kline[:, 3].astype(np.float)[:100]
#         s_low = kline[:, 4].astype(np.float)[:100]
#         s_close = kline[:, 5].astype(np.float)[:100]
#         s_pre_close = kline[:, 6].astype(np.float)[:100]
#         s_vol = kline[:, 9].astype(np.float)[:100]
#         s_amount = (kline[:, 10].astype(np.float) * 1000)[:100]
#         sma_vol_5, sma_vol_10, sma_vol_20 = indicator.sma_vol(kline, 5, 10, 20)
#         sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
#         if s_close[position] > s_open[position] > 0 and s_amount[position] > 15000 * 10000:
#             s_zf = (s_high - s_low) / s_low * 100
#             s_entity = (s_close - s_open) / s_open * 100
#             s_max = (s_close - s_low) / s_low * 100
#             s_down = (s_pre_close - s_low) / s_pre_close * 100
#             # 还是用这个 + d4
#             if sma_close_5[position] < 40:
#                 if s_zf[position] > 4 \
#                         and s_max[position] > 3 \
#                         and s_vol[position] < sma_vol_10[position] * 1.5 \
#                         and sma_close_5[position] < sma_close_20[position] or sma_close_5[position] < sma_close_10[position] \
#                         and s_close[position] > np.max(s_open[position + 1: position + 3]) \
#                         and s_close[position] > np.max(s_close[position + 1: position + 3]) \
#                         and (s_low[position] <= sma_close_10[position] <= s_high[position]
#                              or s_low[position] <= sma_close_20[position] <= s_high[position]
#                              or s_pre_close[position] <= sma_close_20[position] <= s_high[position]):


def hasFile(code):
    return os.path.exists('data/week/{}'.format(code + '.npy')) and os.path.exists('data/daily/{}'.format(code + '.npy'))

def hasDayFile(code):
    return os.path.exists('data/daily/{}'.format(code + '.npy'))


def analysis_daily(position1):
    code_list = get_stock('sha') + get_stock('sza')
    code_list = [code for code in code_list if hasDayFile(code)]
    # code_list = ['600036']
    # code_list = [code for code in code_list if week_filter.t_week_filter(np.load('data/week/{}'.format(code + '.npy'), allow_pickle=True), 0)]
    # code_list = ['600019']
    # code_list = filter_stk1()
    result1 = []
    for code in code_list:
        kline = np.load('data/daily/{}'.format(code + '.npy'), allow_pickle=True)
        if trigger1.t_all(kline, position1):
            print(code)
            result1.append(code)
    return result1


def buy_point():
    result = []
    code_list = get_stock('2020-11-05.txt') + get_stock('2020-11-04.txt') + get_stock('2020-11-03.txt') + get_stock('2020-11-02.txt')
    code_list = [code for code in code_list if hasDayFile(code)]
    for code in code_list:
        kline = np.load('data/daily/{}'.format(code + '.npy'), allow_pickle=True)
        s_open = kline[:, 2].astype(np.float)[:100]
        s_high = kline[:, 3].astype(np.float)[:100]
        s_low = kline[:, 4].astype(np.float)[:100]
        s_close = kline[:, 5].astype(np.float)[:100]
        s_pre_close = kline[:, 6].astype(np.float)[:100]
        s_vol = kline[:, 9].astype(np.float)[:100]
        s_amount = (kline[:, 10].astype(np.float) * 1000)[:100]
        sma_vol_5, sma_vol_10, sma_vol_20 = indicator.sma_vol(kline, 5, 10, 20)
        sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
        if s_close[0] < sma_close_10[0] or s_close[0] < sma_close_20[0]:
            result.append(code)
    return result

if __name__ == '__main__':
    # test()
    # d4_parse_d1(np.load('data/daily/{}'.format('000001' + '.npy')), 0)
    # analysis_d4(0)
    # sync_daily()
    # sync_week()
    # analysis_d2()
    # filter_stk1()
    #
    # print(get_stock('sha'))
    # result = []
    # for position in range(0, 15):
    result = analysis_daily(0)
    with open('tod.txt', mode='w') as f:
        for item in result:
            f.write(item)
            f.write('\n')
    #
    # result = analysis_daily(1)
    # with open('2021-03-18.txt', mode='w') as f:
    #     for item in result:
    #         f.write(item)
    #         f.write('\n')
    #
    # result = analysis_daily(2)
    # with open('2020-03-17.txt', mode='w') as f:
    #     for item in result:
    #         f.write(item)
    #         f.write('\n')

    # result = analysis_daily(3)
    # with open('2020-12-21.txt', mode='w') as f:
    #     for item in result:
    #         f.write(item)
    #         f.write('\n')
    #
    # result = analysis_daily(4)
    # with open('2020-12-18.txt', mode='w') as f:
    #     for item in result:
    #         f.write(item)
    #         f.write('\n')