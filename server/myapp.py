# -*- coding:utf-8 -*-

from flask import Flask, request, make_response
import flask_restful
import flask_restful.reqparse as parse
import requests as r
from operator import methodcaller
import json
from stok import stock_tushare
from server.register import service_stk
import server.service.stk_service as stk_service

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

        return text, 200, {'Access-Control-Allow-Origin': '*'}

    def post(self):
        parser = parse.RequestParser()
        parser.add_argument('url')
        parser.add_argument('data')
        args = parser.parse_args(req=request)
        text = r.post(url=args['url'], data=args['data']).text
        return text


class Service(flask_restful.Resource):
    def get(self):
        parser = parse.RequestParser()
        parser.add_argument('data')
        parser.add_argument('kwargs')
        args = parser.parse_args(req=request)
        data = json.loads(args['data'])
        service = data['service']
        method = data['method']
        kwargs = data.get('kwargs')
        if kwargs:
            methodcaller(method, **kwargs)(service_map[service])
        else:
            methodcaller(method)(service_map[service])
        return 'success', 200, {'Access-Control-Allow-Origin': '*'}


api.add_resource(HelloWorld, '/')
api.add_resource(Proxy, '/proxy')
api.add_resource(Service, '/service')
service_stk.register(api)
service_map = {
    'stk_service': stk_service
}



if __name__ == '__main__':
    app.run(debug=True)