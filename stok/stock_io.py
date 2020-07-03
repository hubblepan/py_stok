# -*- coding:utf-8 -*-

import json
from stok import stock_itm
import requests
import time
import datetime


def get_stock_pool_from_sina(node, page):
    """
    sina批量获取当日行情信息排名接口, 现用于获取全部股票数据
    :param node:
    :param page:
    :return:
"""
    stock_list = []
    time.sleep(1)
    print('start load {} page'.format(str(page)))
    url = "http://gu.sina.cn/hq/api/openapi.php/Wap_Market_Center.getHQNodeData?" \
          "num=40&sort=changepercent&asc=0&_s_r_a=init&node={node}&page={page}&dpc=1" \
          .format(node=node, page=page)
    session = requests.Session()
    session.trust_env = False
    r = session.get(url)
    # 解析数据
    json_obj = json.loads(r.text)
    for json_item in json_obj['result']['data']['data']:
        if json_item['code'] in stock_list:
            continue
        stock_list.append(json_item['code'])
        stockHQ = stock_itm.StockHQ.create(
            symbol=json_item['symbol']
            , code=json_item['code']
            , name=json_item['name']
            , trade=json_item['trade']
            , pricechange=json_item['pricechange']
            , changepercent=json_item['changepercent']
            , aov=json_item['aov']
            , buy=json_item['buy']
            , sell=json_item['sell']
            , settlement=json_item['settlement']
            , open=json_item['open']
            , high=json_item['high']
            , low=json_item['low']
            , volume=json_item['volume']
            , amount=json_item['amount']
            , ticktime=json_item['ticktime']
            , per=json_item['per']
            , pb=json_item['pb']
            , mktcap=json_item['mktcap']
            , nmc=json_item['nmc']
            , turnoverratio=json_item['turnoverratio']
            , date=datetime.datetime.now().strftime('%Y-%m-%d'))
        stockHQ.save()
    size = json_obj['result']['data']['status']['pagetatol']
    if page < size:
        get_stock_pool_from_sina(node, page + 1)


if __name__=='__main__':
    get_stock_pool_from_sina('sh_a', 1)
    get_stock_pool_from_sina('sz_a', 1)