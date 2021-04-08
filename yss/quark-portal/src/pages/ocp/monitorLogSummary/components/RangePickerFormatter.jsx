import moment from 'moment';
import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const RangePickerFormatter = ({ value = '', onChange, ...rest }) => {
  const dateStart = value ? moment(value[0]) : null;
  const dateEnd = value ? moment(value[1]) : null;
  const changeDate = (date, dateString) => {
    if (onChange) {
      onChange(date ? dateString : null);
    }
  };
  /**
   * 1.要注意这个绑定的value一定要与暴露的value有所关联
   * 2.当清空时value一定要为null。value要么为moment对象，要么为null
   */
  // value={value ? [dateStart, dateEnd] : null}
  return (
    <RangePicker {...rest} onChange={changeDate} />
  );
};
export default RangePickerFormatter;
