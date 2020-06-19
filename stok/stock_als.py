# -*- coding:utf-8 -*-

from stok.stock_itm import StockHQ


def filter_stock(stockHQ):
    if stockHQ.name.startswith('*') or 'st' in stockHQ.name:
        return True
    if float(stockHQ.settlement) < 2:
        return True
    if stockHQ.name.startswith('688'):
        return True
    return False


# 100100
def als_1(date='2019-12-24'):
    stock_list = []
    items = StockHQ.select().where(StockHQ.date == date)
    for stockHQ in items:
        s_name = stockHQ.name
        s_code = stockHQ.code
        s_open = float(stockHQ.open)
        s_close = float(stockHQ.trade)
        s_high = float(stockHQ.high)
        s_low = float(stockHQ.low)
        s_pre_close = float(stockHQ.settlement)
        s_zdf = float(stockHQ.changepercent)
        s_amount = float(stockHQ.amount)
        if filter_stock(stockHQ):
            continue
        if s_close > s_open > 0 and s_amount > 10000 * 10000:
            s_zf = (s_high - s_low) / s_low * 100
            s_entity = (s_close - s_open) / s_open * 100
            s_max = (s_close - s_low) / s_low * 100
            s_down = (s_pre_close - s_low) / s_pre_close * 100
            if s_zf > 5 and s_max > 3 and s_down > 2:
                print(s_name)
                stock_list.append(s_code)

    return stock_list



if __name__ == '__main__':
    # get_phone_data()
    # data_to_tdx_phone(zxg=als_1())
    l1 = als_1(date='2020-06-11')

    with open('tod.txt', mode='w') as f:
        for item in l1:
            f.write(item)
            f.write('\n')
    print(l1)