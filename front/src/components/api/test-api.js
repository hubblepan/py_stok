import request from './axios'

export function test1() {
    return request({
        url: 'https://www.jianshu.com/shakespeare/v2/notes/b601ae1c1879/book',
        method: 'get',
        timeout: 10000,
    });
}

export function proxyTest() {
    return request({
       url: 'http://127.0.0.1:5000/proxy',
       method: 'get',
       params: {
           url: 'http://www.baidu.com',
           data: ''
       }
    });
}

export function funcTest() {
    return request({
        url: 'http://127.0.0.1:5000/service',
        method: 'get',
        params: {
            data: {
                service: 'stk_service',
                method: 'test',
                kwargs: {
                  name: 'phb',
                  age: 10,
                },
            },

        }
    })
}
