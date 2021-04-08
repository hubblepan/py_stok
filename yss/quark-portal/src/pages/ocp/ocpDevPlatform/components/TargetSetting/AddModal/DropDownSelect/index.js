// 表格内下拉框组件 dangjingtao 2020/12/10
import React, { useState, useEffect } from 'react';
import  { Select } from 'antd';
import style from './style.less'


/**
 * data:字段值
 * keyValue->value
 * keyName->展示值
 * onChange->变化值，
 * defaultSelectKeyName->默认选择
 */
export default (props) => {
  const { data, keyValue, keyName, keyTitle, onChange, defaultValue, defaultSelectKeyName, disabled , mode, keyColType} = props;

  // 获取默认值
  let defaultSelect = defaultValue;


  data?.forEach(x => {
    if (x[keyName] === defaultSelectKeyName) {
      defaultSelect = x[keyValue];
      return
    }
  })

  const opts = data?.map((x, i) => {
    return (<Select.Option key={i} title={x[keyTitle]} value={x[keyValue]} colType={x[keyColType]}>{x[keyName]}</Select.Option>)
  })

  return (<>
    <Select
      disabled={disabled}
      defaultValue={defaultSelect}
      mode={mode}
      placeholder="请选择"
      bordered={false}
      style={{ width: '100%', height: '100%' }}
      onChange={(...agrs) => onChange(...agrs)}>
      {opts}
    </Select>
  </>);
};
