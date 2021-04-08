---
nav:
  title: 组件
title: QuarkModal 对话框
---

# QuarkModal 对话框

#### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 QuarkModal 在当前页面正中打开一个浮层，承载相应的操作。

## 基本用法

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkModal from '@/components/QuarkModal/index';
import { Button } from 'antd';
export default () => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        点击弹窗
      </Button>
      <QuarkModal title="Quark Modal" visible={visible} onCancel={onCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </QuarkModal>
    </div>
  );
};
```

## 自定义模态框宽度

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkModal from '@/components/QuarkModal/index';
import { Button } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open QuarkModal of 1000px width
      </Button>
      <QuarkModal
        title="QuarkModal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </QuarkModal>
    </>
  );
};
export default Demo;
```

## 自定义页脚

```jsx
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import QuarkModal from '@/components/QuarkModal/index';
import { Button } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open QuarkModal
      </Button>
      <QuarkModal
        title="QuarkModal"
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </QuarkModal>
    </>
  );
};
export default Demo;
```

## API

| 参数        | 说明                                            | 类型      | 默认值 | 版本 |
| ----------- | ----------------------------------------------- | --------- | ------ | ---- |
| title       | 标题                                            |           |        |      |
| visible     | 对话框是否可见                                  |           |        |      |
| footer      | 当不需要默认底部按钮时，可设为  `footer={null}` | ReactNode |        |      |
| modalRender | 自定义渲染对话框                                |           |        |      |
| style       | 可用于设置浮层的样式，调整浮层位置等            |           |        |      |
| width       | 宽度                                            |           | 900    |      |
| closeIcon   | 自定义关闭图标                                  |           |        |      |
| onOk        | 点击确定回调                                    |           |        |      |
| isDrag      | 是否拖拽                                        |           | true   |      |
| fullScreen  | 全屏模式                                        |           | true   |      |
| ......      | 其他 API 详情请查看 Ant Design 官网 Modal 组件  |           |        |      |
