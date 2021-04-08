// 简单快速的select,目前支持配置url
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import request from '@/utils/request'

const { Opiton } = Select;

export default (props) => {
  const { requestopts } = props;


  const req = (url, data) => {
    return new Promise((resolve, reject) => {
      request(url, {
        method: 'post',
        data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  const [opts, setOpts] = useState([])

  useEffect(() => {
    (async () => {
      if (requestopts) {
        const { url, key = 'id', value = 'label', data = {}, convert = (res) => {
          return res.data.list
        } } = requestopts;
        const res = await req(url, data);

        const list = convert(res);

        const opts = list.map((x, i) => {
          return <Option key={x[key]} value={x[key]}>{x[value]}</Option>
        })
        setOpts(opts)
      }
    })()
  }, [])


  return <Select {...props} >{opts}</Select>
}