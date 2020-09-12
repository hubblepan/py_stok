# -*- coding:utf-8 -*-

import numpy as np
from stok import stock_indicator as indicator

"""
过滤掉 自上一次周线穿过20日线后， 距离当前价格超过40%的价格
"""


def t_week_filter(kline, position):
    # 日线条数要大于120条， 6个月
    if kline.shape[0] < 30:
        return False
    s_open = kline[:, 2].astype(np.float)[:100]
    s_high = kline[:, 3].astype(np.float)[:100]
    s_low = kline[:, 4].astype(np.float)[:100]
    s_close = kline[:, 5].astype(np.float)[:100]
    s_pre_close = kline[:, 6].astype(np.float)[:100]
    s_vol = kline[:, 9].astype(np.float)[:100]
    s_amount = (kline[:, 10].astype(np.float) * 1000)[:100]
    sma_vol_5, sma_vol_10, sma_vol_20 = indicator.sma_vol(kline, 5, 10, 20)
    sma_close_5, sma_close_10, sma_close_20 = indicator.sma(kline, 5, 10, 20)

    # 周线越过 sma20后， 上涨超过 50%的不考虑
    for index in range(0, kline.shape[0] - 22):
        if s_low[index] < sma_close_20[index]:
            price_20 = sma_close_20[index]
            if (s_close[position] - price_20 / price_20) * 100 > 100:
                return False
    return True
