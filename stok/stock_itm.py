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
    trade = CharField()
    pricechange = CharField()
    changepercent = CharField()
    aov = CharField()
    buy = CharField()
    sell = CharField()
    settlement = CharField()
    open = CharField()
    high = CharField()
    low = CharField()
    volume = IntegerField()
    amount = IntegerField()
    ticktime = CharField()
    per = FloatField()
    pb = FloatField()
    mktcap = FloatField()
    nmc = FloatField()
    turnoverratio = CharField()
    date = CharField()

    class Meta:
        database = db # This model uses the "people.db" database.


if __name__=='__main__':
    db.connect()
    db.create_tables([StockHQ, StockLabel])
