# -*- coding:utf-8 -*-
host = 'http://192.168.4.225:8066'

def test(name, age, **kwargs):
    print(name, age)


a = {'name': 'phb', 'age': 10, 'abc': ''}
test(**a)

if a.get('abc'):
    print('abc')
else:
    print('none')