import requests as r
import json
from bs4 import BeautifulSoup
import datetime
from es import randomUtil

_index = 'research'
_type = '_doc'


# 创建一条记录
# 注： index 名称小写， 不能以 _(下划线)开头
def put_document(index, _type, _id, json_data):
    res = r.put('http://localhost:9200/{index}/{type}/{id}?pretty'.format(index=index, type=_type, id=_id),
                data=json.dumps(json_data),
                headers={
                    'Content-Type': 'application/json'
                })

    print(res.text)


def post_document(index, _type, json_data):
    res = r.post('http://localhost:9200/{index}/{type}?pretty'.format(index=index, type=_type),
                data=json.dumps(json_data),
                headers={
                    'Content-Type': 'application/json'
                })
    print(res.text)


def search_by_id(_index, _type, _id):
    res = r.get('http://localhost:9200/{index}/{type}/{id}?pretty'.format(index=_index, type=_type, id=_id))
    print(res.text)


def search_all(_index, _type):
    res = r.get('http://localhost:9200/{index}/{type}/_search?pretty'.format(index=_index, type=_type))
    print(res.text)


def search_with_page(_index, _type, _from, _size):
    res = r.get('http://localhost:9200/{index}/{type}/_search?pretty=true&from={_from}&size={size}'.format(index=_index, type=_type, _from=_from, size=_size))
    print(res.text)


def query_all():
    data = {
        'query': {
            'match_all': {}
        }
    }
    res = r.get('http://localhost:9200/{index}/{type}/_search?pretty'.format(index=_index, type=_type),
                data=json.dumps(data),
                headers={'Content-Type': 'application/json'})
    print(res.text)


def query(index, _query):
    res = r.get('http://localhost:9200/{index}/{type}/_search?pretty'.format(index=index, type='_doc'),
                data=json.dumps(_query),
                headers={'Content-Type': 'application/json'})
    print(res.text)
    return json.loads(res.text)


def delete(path):
    res = r.delete('http://localhost:9200{path}'.format(path=path))
    print(res.text)


def get(path):
    res = r.get('http://localhost:9200{path}'.format(path=path))
    print(res.text)


def put(path, json_data):
    res = r.put('http://localhost:9200{path}'.format(path=path), json.dumps(json_data), headers={'Content-Type': 'application/json'})
    print(res.text)


def post_pretty(path, json_data):
    res = r.post('http://localhost:9200{path}?pretty'.format(path=path),
                 data=json.dumps(json_data),
                 headers={
                     'Content-Type': 'application/json'
                 })
    print(res.text)


def post(path, json_data):
    res = r.post('http://localhost:9200{path}'.format(path=path), json.dumps(json_data), headers={'Content-Type': 'application/json'})
    print(res.text)

# 基本查询条目

q_match = {
    'query': {
        'match': {'message': '失败'}
    }
}

q_range = {
    'query': {
        'range': {'time': {'gte': '2020-05-02'}}
    }

}

q_term = {
    'query': {
         'term': {'level': 'info'}
    }
}



# 混合查询
# must代表必须匹配， 即 匹配到的结果 必须符合 must 定义的条件。
# should代表不强制匹配 对于 匹配到的结果 符合 should 条件的得分更高， 如果 query context 没有must, 则should 应该至少匹配一个
# filter 和 must not 过滤， 优先执行， 和 must的区别在于 filter 不计算得分，效率更高
# match 采用的 倒排索引， 即 `match` 先对查询条件进行 分词， 只要有一个分词出现在 查询条件对应的索引中， 则匹配成功， 匹配度越高的得分越高。
q_query_and_filter_context = {
    'query': {
        'bool': {
            'must': [
                {
                    'match': {'message': '网络连接失败'},
                },
            ],
            'should': [
                {'match': {'message': '哈哈'}}
            ],
            'filter': [
                {
                    'term': {'level': 'error'},
                }
            ]
        }
    }
}

# 不管什么查询， 只要匹配， 则计分1
q_constant_score_filter = {
    'query': {
        'constant_score': {
          'filter': {
            'match': {
              'message': '失败'
            }
          }
        }
      }
}

# bootsting 和 `positive` , `negative`, `negative_boost`绑定，  对于 匹配 positive 加分， 对于 匹配 negative 减分
q_boosting = {
    'query': {
        'boosting': {
            'positive': {
                'bool': {
                    'must': [
                        {'term': {'level': 'error'}},
                        {'match': {'message': '失败去'}}
                    ]
                }
            },
            'negative': {'match': {'message': '哈哈'}},
            'negative_boost': 0.5
        }
    }
}

# dis_max 中必须包含 `queries`, queries 包含多个查询， 取这些查询中 匹配到的最高的得分作为 最终得分  (寻找最佳匹配)
# tie_breaker 最终得分 考虑其他的分数， 默认不考虑
q_dis_max = {
    'query': {
        'dis_max': {
            'queries': [
                {'match': {'level': '请求'}},
                {'match': {'message': '嘿嘿失败'}},
            ],
            'tie_breaker': 0.7
        }
    }
}

# 条件控制关键字 term, match, match_phrase, range,
# 查询种类 bool(must, must_not, should, filter)


def reg():
    str = '安保a()'
    pass


if __name__ == '__main__':
    query_all()
    # put('/demo3', json_data={})
    # 创建索引，  同时指定 settings 和 mappings,   注意： mappings 后期只可新增， 不可修改
    # put('/people2', json_data={
    #     'settings': {
    #       'number_of_shards': 3,
    #       'number_of_replicas': 2
    #     },
    #     'mappings': {
    #         'properties': {
    #             'name': {
    #                 'type': 'text',  #
    #             },
    #             'age': {
    #                 'type': 'integer',  # long, double, boolean, integer 等
    #             },
    #             'born_date': {
    #                 'type': 'date',
    #                 'format': 'yyyy-MM-dd HH:mm:ss'  # 日期类型 可以指定 format
    #             },
    #             'family_member': {
    #                 'type': 'nested',   # 对象使用 object 类型， 数组使用 nested类型
    #                 'properties': {     # nested 和 object 都有 properties属性， 用来指定 子对象 的属性类型
    #                     'name': {
    #                         'type': 'text',
    #                     },
    #                     'relation': {
    #                         'type': 'text',
    #                     }
    #                 }
    #             }
    #         }
    #     }
    # })

    # 复杂对象的 mapping 嵌套
    # {
    #     "region": "US",
    #     "manager": {
    #         "age": 30,
    #         "name": {
    #             "first": "John",
    #             "last": "Smith"
    #         }
    #     }
    # }
    # {
    #     "mappings": {
    #         "properties": {
    #             "region": {
    #                 "type": "keyword"
    #             },
    #             "manager": {
    #                 "properties": {
    #                     "age": {"type": "integer"},
    #                     "name": {
    #                         "properties": {
    #                             "first": {"type": "text"},
    #                             "last": {"type": "text"}
    #                         }
    #                     }
    #                 }
    #             }
    #         }
    #     }
    # }

    # 查看索引的 mapping
    # get('/people2/_mapping')
    #
    # # 添加一些数据
    # post_pretty('/people2/_doc', json_data={
    #     'name': 'panhaobo3',
    #     'age': '30',
    #     'born_date': '1991-07-06 08:08:08',
    #     'family_member': [{'name': 'plh', 'relation': 'father'}, {'name': 'lxh', 'relation': 'mother'}]
    # })

    # search_all(_index, _type)
    # search_by_id(_index, _type, 'Ctc2l3IBtU89eAPVpJg2')
    # search_with_page(_index, _type, 2, 3)  # 查询 从第三个位置开始的后三个数据
    # query_all()
    # query(q_range)
    # post_document(_index, _type, json_data={
    #       "time' : "2020-06-22 01:01:11",
    #       "message" : "哈哈, 失败2失败2失败2失败2",
    #       "level" : "error"
    #     })
    # post_document(_index, _type, json_data={
    #     "time": "2020-06-22 01:01:11",
    #     "message": "哈哈, 失败2失败2",
    #     "level": "error"
    # })