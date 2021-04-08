// 动态表单业务组件
// | 控件类型            | 控件说明                       |
// | ------------------- | ------------------------------ |
// | text                | 纯文本                         |
// | YssSelCombox        | 下拉框控件                     |
// | YssTextBox          | 文本框控件                     |
// | ImprovedTextBox     | 带前后缀的文本控件             |
// | SubsectionTextBox   | 范围型控件                     |
// | YssDateTimeInterval | 日期控件                       |
// | QuickLink           | 扩展参数链接，点击打开扩展参数 |

import { Input, Select } from 'antd';

const YSSText = (props) => {
  return <Input />;
};

const YssSelCombox = () => {
  return <Select></Select>;
};

const ImprovedTextBox = () => {
  return <Input addonAfter="$" />;
};

const SubsectionTextBox = () => {
  return;
};

export default (props) => {
  const { type } = props;

  return <>业务组件{type}</>;
};
