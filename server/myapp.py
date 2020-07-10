# -*- coding:utf-8 -*-

from flask import Flask, request
import flask_restful
import flask_restful.reqparse as parse
import requests as r
from stok import stock_tushare
from server.register import service_stk

app = Flask(__name__)
api = flask_restful.Api(app)


class HelloWorld(flask_restful.Resource):
    def get(self):
        return {'hello': 'world'}


class Proxy(flask_restful.Resource):
    def get(self):
        parser = parse.RequestParser()
        parser.add_argument('url')
        parser.add_argument('data')
        args = parser.parse_args(req=request)
        text = r.get(url=args['url'], data=args['data']).text
        return text

    def post(self):
        parser = parse.RequestParser()
        parser.add_argument('url')
        parser.add_argument('data')
        args = parser.parse_args(req=request)
        text = r.post(url=args['url'], data=args['data']).text
        return text




api.add_resource(HelloWorld, '/')
api.add_resource(Proxy, '/proxy')
service_stk.register(api)

if __name__ == '__main__':
    app.run(debug=True)