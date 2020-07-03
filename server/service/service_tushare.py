# -*- coding:utf-8 -*-
from flask_restful import Resource
import flask_restful.reqparse as parse
from flask_restful import Api


class Core(Resource):
    def get(self):

        pass


class Performance(Resource):
    def get(self):
        pass


class Operator(Resource):
    def post(self):
        pass


def register(api):
    api.add_resource(Core, '/tushare/core')
    api.add_resource(Performance, '/tushare/performance')
    api.add_resource(Operator, '/tushare/opt')