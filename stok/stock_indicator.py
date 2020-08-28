import numpy as np

def sma(kline, *timeperiod):
    """
    :param kline:
    :param timeperiod:
    :return:
    """
    close = kline[:, 5].astype(np.float)
    return [_sma(close, timeperiod=i) for i in timeperiod]

def sma_vol(kline, *timeperiod):
    """
    :param kline:
    :param timeperiod:
    :return:
    """
    vol = kline[:, 9].astype(np.float)
    return [_sma(vol, timeperiod=i) for i in timeperiod]


def sma_week(kline, *timeperiod):
    """
    :param kline:
    :param timeperiod:
    :return:
    """
    close = kline[:, 2].astype(np.float)
    return [_sma(close, timeperiod=i) for i in timeperiod]


def _sma(nparr, timeperiod):
    return np.convolve(np.ones(timeperiod) / timeperiod,  nparr)[timeperiod - 1 : -timeperiod + 1]