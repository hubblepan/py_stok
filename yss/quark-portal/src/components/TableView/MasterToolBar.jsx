/**
 * 对主表搜索栏的封装
 */
import React from 'react';

import { buttonFilter } from '@/handles/buttonFilter';
import SvgIcon from '@/components/SvgIcon/index';
import { FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
const { SubMenu } = Menu;
/**
 * 渲染按钮，并绑定事件
 * @param {*} button
 * @param {*} handles
 * @param {*} currentRow
 */
const renderButton = (button, handles) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  // 按钮点击处理逻辑
  const onClick = (event) => {
    if (!handles) {
      return;
    }
    const methodName = button.method;
    const method = handles[methodName];
    method && method.call(handles, event, button);
  };
  // 调用自定义禁用按钮事件
  const disabled = handles.getButtonState(button);
  return (
    button.visible && (
      <Menu.Item key={button.order} disabled={disabled} onClick={onClick}>
        {button.text}
      </Menu.Item>
    )
  );
};
const renderSubItem = (button, handles) => {
  const childrenItems =
    button.children &&
    button.children.map((button) => {
      // 递归渲染
      return renderItem(button, handles);
    });

  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  // disable逻辑
  const disabled = handles.getButtonState(button);
  return (
    <SubMenu key={button.order} title={button.text} disabled={disabled}>
      {childrenItems}
    </SubMenu>
  );
};
const renderItem = (item, handles) => {
  return item.children ? renderSubItem(item, handles) : renderButton(item, handles);
};

/**
 * 工具栏组件
 * @param {*} props
 */
const ToolBar = (props) => {
  const { handles, buttons, more } = props;
  const toolbar = buttonFilter(buttons);
  const moreButtons = buttonFilter(more);
  // handles.toolbar = toolbar;
  return (
    <Dropdown
      overlay={
        <Menu mode="vertical">
          {toolbar.map((item) => {
            return renderItem(item, handles);
          })}
        </Menu>
      }
      placement="bottomCenter"
      trigger={['click']}
    >
      <MoreOutlined />
    </Dropdown>
    // <nav className="a-card-toolbar">
    //   {toolbar.map((item) => {
    //     return renderButton(item, handles);
    //   })}
    //   {/* {more &&
    //     more.map((item, index) => {
    //       return renderButton(item, handles, currentRow, index);
    //     })} */}
    //   {moreRender(handles, moreButtons)}
    //   <span
    //     style={{
    //       padding: '12px 8px 18px 8px',
    //       borderLeft: '1px solid #f0f0f0',
    //       background: '#fff',
    //     }}
    //   >
    //     <Button type="text" icon={<FilterOutlined />}>
    //       筛选
    //     </Button>
    //   </span>
    // </nav>
  );
};

export default ToolBar;
