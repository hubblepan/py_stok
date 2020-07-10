# -*- coding:utf-8 -*-
from flask_restful import Resource
import flask_restful.reqparse as parser
from flask_restful import Api
from flask import request
from stok import stock_tushare


class Core(Resource):
    def get(self):

        pass


class Performance(Resource):
    def get(self):
        pass


class Operator(Resource):
    def post(self):
        parser.add_argument('sync')
        args = parser.parse_args(req=request)
        if args['sync'] == '':
            stock_tushare.sync_daily()
        elif args['sync'] == '':
            stock_tushare.sync_week()
        else:
            return {'result': -1, 'message': '参数错误'}
        return {'result': 0, 'message': ''}



class Als(Resource):
    def get(self):
        parser.add_argument('type')
        parser.add_argument('position')
        args = parser.parse_args(req=request)
        stock_tushare.sync_daily()
        return {'result': 0, 'message': ''}





def register(api):
    api.add_resource(Core, '/stk/core')
    api.add_resource(Performance, '/stk/performance')
    api.add_resource(Operator, '/stk/opt')