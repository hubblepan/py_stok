# SvgIcon 图标

## 普通图标

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import SvgIcon from '@/components/SvgIcon/index';
export default () => {
  return (
    <>
      <SvgIcon icon="add" />
      <SvgIcon icon="edit" />
      <SvgIcon icon="delete" />
      <SvgIcon icon="uncheck" />
      <SvgIcon icon="audit" />
      <SvgIcon icon="close" />
      <SvgIcon icon="delink" />
      <SvgIcon icon="detail" />
      <SvgIcon icon="error" />
      <SvgIcon icon="filter" />
      <SvgIcon icon="guide" />
      <SvgIcon icon="links" />
      <SvgIcon icon="detection" />
      <SvgIcon icon="home" />
      <SvgIcon icon="info" />
      <SvgIcon icon="upload" />
      <SvgIcon icon="warning" />
    </>
  );
};
```

## 带颜色的图标

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import SvgIcon from '@/components/SvgIcon/index';
export default () => {
  return (
    <>
      <SvgIcon icon="add" fill="red" />
    </>
  );
};
```

## 引用 Ant Design 的 icon 图标

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import SvgIcon from '@/components/SvgIcon/index';
import { CheckCircleOutlined } from '@ant-design/icons';

export default () => {
  return (
    <>
      <SvgIcon icon={<CheckCircleOutlined />} />
    </>
  );
};
```

## 数字图标

```jsx
import React from 'react';
import 'antd/dist/antd.css';
import SvgIcon from '@/components/SvgIcon/index';
export default () => {
  return (
    <>
      <SvgIcon icon={456} />
    </>
  );
};
```

## API

| 参数      | 说明     | 类型          | 默认值 | 版本 |
| --------- | -------- | ------------- | ------ | ---- |
| icon      | svg 名字 |               |        |      |
| fill      | 填充颜色 |               |        |      |
| className | 类名     |               |        |      |
| style     | 样式     | CSSProperties |        |      |
| options   | 其他操作 |               |        |      |
