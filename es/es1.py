import requests as r
import json
import datetime
from es import randomUtil

_index = 'logger'
_type = 'Log'


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


def query(_query):
    res = r.get('http://localhost:9200/{index}/{type}/_search?pretty'.format(index=_index, type=_type),
                data=json.dumps(_query),
                headers={'Content-Type': 'application/json'})
    print(res.text)


def insert_log(time, message, level):
    post_document('logger', 'Log', {'time': time, 'message': message, 'level': level})


def generate_date():
    return datetime.date.isoformat()


# 删除一个索引
def deleteIndex(indexName):
    pass


def get(path):
    res = r.get('http://localhost:9200{path}'.format(path=path))
    print(res.text)


q_query_and_filter_context = {
    'query': {
        'bool': {
            'must': [
                {
                    'match': {'message': '失败'},
                }
            ],
            'filter': [
                {
                    'term': {'level': 'error'},
                }
            ]
        }
    }
}


if __name__ == '__main__':
    # search_all(_index, _type)
    # search_by_id(_index, _type, 'Ctc2l3IBtU89eAPVpJg2')
    # search_with_page(_index, _type, 2, 3)  # 查询 从第三个位置开始的后三个数据
    # query_all()
    # get('/logger/_mapping')
    query(q_query_and_filter_context)
