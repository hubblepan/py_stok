# -*- coding:utf-8 -*-
from peewee import *
import datetime

db = SqliteDatabase('stock.db')

class StockLabel(Model):
    symbol = CharField()
    code = CharField()
    name = CharField()
    label = CharField()

    class Meta:
        database = db # This model uses the "people.db" database.

class StockTrack(Model):
    symbol = CharField()
    price_ceiling = FloatField()
    price_floor = FloatField()
    pass


class StockHQ(Model):
    symbol = CharField()
    code = CharField()
    name = CharField()
    trade = CharField()  # 当前价
    pricechange = CharField() # 涨跌额
    changepercent = CharField() # 涨跌幅
    aov = CharField()
    buy = CharField()
    sell = CharField()
    settlement = CharField() # 昨收
    open = CharField() # 开
    high = CharField() # 高
    low = CharField() # 低
    volume = IntegerField() # 量
    amount = IntegerField() # 额
    ticktime = CharField()
    per = FloatField()
    pb = FloatField()
    mktcap = FloatField()
    nmc = FloatField()
    turnoverratio = CharField() # 换手
    date = CharField()

    class Meta:
        database = db # This model uses the "people.db" database.


if __name__=='__main__':
    db.connect()
    db.create_tables([StockHQ, StockLabel])