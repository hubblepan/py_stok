# -*- coding:utf-8 -*-

from es import es1
import json


def find_by_code():
    pass


def find_by_code_with_match_phrase():
    pass


def find_by_code(code):
    q = {
        'query': {
            'bool': {
                'must': {
                    'match_phrase': {'title': '龙头'}  # code
                },
                'filter': [
                    {
                        'range': {
                            'date': {
                                'gte': '2020-01-01',
                                'lte': '2020-07-01'
                            }
                        }
                    },
                    {
                        'term': {
                            'code': code
                        }
                    }
                ]
            }
        },
        'size': 1000,
    }
    res = es1.query('research', q)
    return res['hits']['hits']


def d1():
    res = es1.query('research', {
        'query': {
            'bool': {
                'must': {
                  'match_phrase': {'title': '龙头'} # code
                },
                'filter': {
                    'range': {
                        'date': {
                            'gte': '2020-01-01',
                            'lte': '2020-07-01'
                        }
                    }
                    # 'regexp': {
                    #     'code': '^600'
                    # }
                }
            }
        },
        'size': 0,
        'aggs': {
            'counts': {
                'terms': {
                    'size': '1000',
                    'field': 'code'
                }
            }
        }
    })
    l = res['aggregations']['counts']['buckets']
    result = []
    with open('lt.txt', mode='w') as f:
        for item in l:
            if item['doc_count'] >= 4 and item['key'][:2] in ['60', '00', '30']:
                f.write(item['key'])
                f.write('\n')
                research_list = find_by_code(item['key'])
                research_code = item['key']
                result.append({'code': research_code, 'items': research_list, 'total': len(research_list)})
    return result


if __name__ == '__main__':
    # str = json.dumps(d1(), indent=4)
    # with open('a.txt', mode='w') as f:
    #     f.write(str)
   find_by_code('600176')
   # es1.put('/research/_mapping', json_data={
   #          'properties': {
   #              'title': {
   #                  'type': 'text',
   #                  'analyzer': 'ik_max_word',
   #                  'search_analyzer': 'ik_smart'
   #              },
   #              'type': {
   #                  'type': 'text',
   #                  'fielddata': True
   #              },
   #              'date': {
   #                  'type': 'date',
   #                  'format': 'yyyy-MM-dd'  # 日期类型 可以指定 format
   #              },
   #              'org': {
   #                  'type': 'text',
   #                  'fielddata': True
   #              },
   #              'author': {
   #                  'type': 'text',
   #                  'fielddata': True
   #              },
   #              'link': {
   #                  'type': 'text',
   #              },
   #              'code': {
   #                  'type': 'text',
   #                  'fielddata': True
   #              },
   #              'name': {
   #                  'type': 'text',
   #                  'fielddata': True
   #              }
   #          }
   #      })