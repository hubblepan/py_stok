import requests as r
import json
from bs4 import BeautifulSoup
from es import es1
import re


def parse_table():
    pass


def delete_es_index():
    es1.delete('/research')


def create_es_index():
    # 索引类型 company
    es1.put('/research', json_data={
        'settings': {
            'number_of_shards': 3,
            'number_of_replicas': 2
        },
        'mappings': {
            'properties': {
                'title': {
                    'type': 'text',
                    'analyzer': 'ik_max_word',
                    'search_analyzer': 'ik_smart'
                },
                'type': {
                    'type': 'text',
                    'fielddata': True
                },
                'date': {
                    'type': 'date',
                    'format': 'yyyy-MM-dd'  # 日期类型 可以指定 format
                },
                'org': {
                    'type': 'text',
                    'fielddata': True
                },
                'author': {
                    'type': 'text',
                    'fielddata': True
                },
                'link': {
                    'type': 'text',
                },
                'code': {
                    'type': 'text',
                    'fielddata': True
                },
                'name': {
                    'type': 'text',
                    'fielddata': True
                }
            }
        }
    })


def code_picker(title):
    search_result = re.search(r'[A\u4e00-\u9fa5]{2,5}\([0-9]{6}\)', title, flags=0)
    code = ''
    name = ''
    if search_result:
        result = search_result.group()

        if result:
            code = re.search(r'[0-9]{6}', result, flags=0).group()
            name = re.search(r'[A\u4e00-\u9fa5]{2,5}', result, flags=0).group()
    return code, name



def request_all():
    delete_es_index()
    create_es_index()
    for page in range(1, 1000):
        html = r.get('http://stock.finance.sina.com.cn/stock/go.php/vReport_List/kind/company/index.phtml?p={page}'.format(page=page)).text
        soup = BeautifulSoup(html, 'html.parser')
        for item in soup.table.find_all('tr')[2:]:
            tds = item.find_all('td')
            obj = {
                'title': tds[1].a['title'],
                'type': tds[2].get_text(),
                'date': tds[3].get_text(),
                'org': tds[4].find('span').get_text(),
                'author': tds[5].find('span').get_text(),
                'link': tds[1].a['href']
            }
            obj['code'], obj['name'] = code_picker(obj['title'])

            # 存入 es
            es1.post('/research/_doc?pretty', obj)
            print(page)


if __name__ == '__main__':
    request_all()