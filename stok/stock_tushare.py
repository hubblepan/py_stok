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


def today():
    return datetime.now().strftime('%Y%m%d')


def d_week(code):
    data = api('weekly', {
        'ts_code': code,
        'start_date': '20190107',
        'end_date': today(),
    })
    print(data)
    return json.loads(data)['data']['items']


def d_daily(code):
    data = api('daily', {
        'ts_code': code,
        'start_date': '20190107',
        'end_date': today(),
    })
    print(data)
    return json.loads(data)['data']['items']


def test():
    pass


def sync_week():
    code_list = get_stock('sha')
    for code in code_list:
        try:
            data = np.array(d_week(code + '.SH'))
            np.save('data/week/{}'.format(code), data)
        except Exception as e:
            pass

    code_list = get_stock('sza')
    for code in code_list:
        try:
            data = np.array(d_week(code + '.SZ'))
            np.save('data/week/{}'.format(code), data)
        except Exception as e:
            pass


def sync_daily():
    code_list = get_stock('sha')
    for code in code_list:
        try:
            data = np.array(d_daily(code + '.SH'))
            np.save('data/daily/{}'.format(code), data)
        except Exception as e:
            pass

    code_list = get_stock('sza')
    for code in code_list:
        try:
            data = np.array(d_daily(code + '.SZ'))
            np.save('data/daily/{}'.format(code), data)
        except Exception as e:
            pass


def test2():
    kline = np.load('data/daily/600000.npy')
    sma_close_5 = indicator.sma(kline, 5)[0]
    print(kline)


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


def good_d_line(code, position_range):
    kline = np.load('data/daily/{}'.format(code + '.npy'))
    if kline.shape[0] < 120:
        return None
    s_open = kline[:, 2].astype(np.float)[:100]
    s_high = kline[:, 3].astype(np.float)[:100]
    s_low = kline[:, 4].astype(np.float)[:100]
    s_close = kline[:, 5].astype(np.float)[:100]
    s_pre_close = kline[:, 6].astype(np.float)[:100]
    s_vol = kline[:, 9].astype(np.float)[:100]
    s_amount = (kline[:, 10].astype(np.float) * 1000)[:100]
    s_zf = (s_high - s_low) / s_low * 100
    s_entity = (s_close - s_open) / s_open * 100
    s_max = (s_close - s_low) / s_low * 100
    s_down = (s_pre_close - s_low) / s_pre_close * 100
    sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
    result = []
    for position in range(position_range[0], position_range[1]):
        score = 0
        if s_close[position] > s_open[position] and s_amount[position] > 10000 * 10000:
            score = 0.5
            if s_low[position] < sma_close_5[position] < s_high[position]:
                score += 2
            if s_low[position] < sma_close_10[position] < s_high[position]:
                score += 2
            if s_low[position] < sma_close_20[position] < s_high[position]:
                score += 10
            if score >= 2:
                if s_zf[position] > 5 or s_entity[position] > 3:
                    score += 2
                else:
                    score = 0
                    if score < 0:
                        score = 0
        if s_close[position_range[0]] > sma_close_5[position_range[0]]:
            score = 0
        result.append(score)
    return result


def analysis_d2():
    code_list = get_stock('sha') + get_stock('sza')
    result = []
    for index in range(0, 15):
        for code in code_list:
            score_list = good_d_line(code, [index, index + 10])
            if not score_list:
                continue
            filter_result = [x for x in score_list if x > 2.5]
            filter_20 = [x for x in filter_result if x > 10]
            if len(filter_result) > 3 and len(filter_20) >= 1:
                if code not in result:
                    result.append(code)

    with open('d2.txt', mode='w') as f:
        for item in result:
            f.write(item)
            f.write('\n')
    print(result)


def analysis_daily_d4(position):

    pass


def analysis_daily_d3(position):
    # code_list = get_stock('sha') + get_stock('sza')
    code_list = filter_stk1()
    result = []
    for code in code_list:
        kline = np.load('data/daily/{}'.format(code + '.npy'))
        if kline.shape[0] < 120:
            continue
        s_open = kline[:, 2].astype(np.float)[:100]
        s_high = kline[:, 3].astype(np.float)[:100]
        s_low = kline[:, 4].astype(np.float)[:100]
        s_close = kline[:, 5].astype(np.float)[:100]
        s_pre_close = kline[:, 6].astype(np.float)[:100]
        s_vol = kline[:, 9].astype(np.float)[:100]
        s_amount = (kline[:, 10].astype(np.float) * 1000)[:100]
        sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
        if s_close[position] > s_open[position] > 0 and s_amount[position] > 20000 * 10000:
            s_zf = (s_high - s_low) / s_low * 100
            s_entity = (s_close - s_open) / s_open * 100
            s_max = (s_close - s_low) / s_low * 100
            s_down = (s_pre_close - s_low) / s_pre_close * 100
            if s_zf[position] > 3:
                if s_low[position] < sma_close_5[position] < s_high[position] and (s_low[position] < sma_close_10[position] < s_high[position] and s_low[position] < sma_close_20[position] < s_high[position]):
                    if np.max(s_close[position: position + 4]) == s_close[position]:
                        print(code)
                        result.append(code)
    return result

def analysis_daily(position):
    # code_list = get_stock('sha') + get_stock('sza')
    code_list = filter_stk1()
    result = []
    for code in code_list:
        kline = np.load('data/daily/{}'.format(code + '.npy'))
        if kline.shape[0] < 120:
            continue
        s_open = kline[:, 2].astype(np.float)[:100]
        s_high = kline[:, 3].astype(np.float)[:100]
        s_low = kline[:, 4].astype(np.float)[:100]
        s_close = kline[:, 5].astype(np.float)[:100]
        s_pre_close = kline[:, 6].astype(np.float)[:100]
        s_vol = kline[:, 9].astype(np.float)[:100]
        s_amount = (kline[:, 10].astype(np.float)*1000)[:100]
        sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)
        if s_close[position] > s_open[position] > 0 and s_amount[position] > 10000 * 10000:
            s_zf = (s_high - s_low) / s_low * 100
            s_entity = (s_close - s_open) / s_open * 100
            s_max = (s_close - s_low) / s_low * 100
            s_down = (s_pre_close - s_low) / s_pre_close * 100
            if s_zf[position] > 5 and s_max[position] > 3:
                if s_low[position] <= sma_close_5[position] <= s_high[position] or s_low[position] <= sma_close_10[position] <= s_high[position] or s_low[position] <= sma_close_20[position] <= s_high[position]:
                    print(code)
                    result.append(code)
    return result


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
    sync_daily()
    # sync_week()
    # analysis_d2()
    # filter_stk1()
    # d_week('600000.SH')
    result = analysis_daily_d3(4) + analysis_daily_d3(3) + analysis_daily_d3(2) + analysis_daily_d3(1) + analysis_daily_d3(0)
    result_f = []
    [(result_f.append(x)) for x in result if x not in result_f]
    with open('tod.txt', mode='w') as f:
        for item in result_f:
            f.write(item)
            f.write('\n')

