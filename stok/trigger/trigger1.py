# -*- coding:utf-8 -*-

import numpy as np
from stok import stock_indicator as indicator


def t_all(kline, position):
    # 日线条数要大于120条， 6个月
    if kline.shape[0] < 120:
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

    # 成交额要大于1.5亿
    if s_amount[position] < 1.5 * 100000000:
        return False

    # 开盘价要小于于收盘价
    if s_open[position] > s_close[position]:
        return False

    s_zf = (s_high - s_low) / s_low * 100
    s_entity = (s_close - s_open) / s_open * 100
    s_max = (s_close - s_low) / s_low * 100
    s_down = (s_pre_close - s_low) / s_pre_close * 100

    # 不考虑40元以上的股票
    if sma_close_5[position] > 40:
        return False

    # 不考虑没有波动的股票
    if s_zf[position] < 4 or s_max[position] < 3:
        return False

    # 若上涨幅度没有超过前面两个k线的高度， 不考虑
    if s_high[position] < np.max(s_open[position + 1: position + 3]):
        return False
    if s_high[position] < np.max(s_close[position + 1: position + 3]):
        return False

    # 突然爆量的涨幅不要
    if s_vol[position] / s_vol[position + 1] > 3:
        return False

    # 没有穿过均线的不要
    if s_low[position] > max(sma_close_10[position], sma_close_20[position]):
        return False
    if s_high[position] < min(sma_close_10[position], sma_close_20[position]):
        return False

    # 过去1个月内， 有成交额在5000万以内的不考虑
    for amount in s_amount[0: 30]:
        if amount < 5000 * 10000:
            return False


    all_vol = kline[:, 9].astype(np.float)
    np.sort(all_vol)
    return True
