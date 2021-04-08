import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';

import SvgIcon from '@/components/SvgIcon';
import { buttonFilter } from '@/handles/buttonFilter';

const { SubMenu } = Menu;

const onClick = (button: any, handles: any) => (event: any) => {
  let { method } = button;
  if (method && typeof method === 'function') {
    method.call(button, { event, button });
    return;
  }
  if (!handles) {
    return;
  }
  if (method) {
    method = handles[method];
  } else {
    method = handles[button.id];
  }
  if (method) {
    method.call(handles, { event, button });
  }
};

const renderSubMenu = (button: any, handles: any, selectedRows: any) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  const disabled = button.disable && button.disable(selectedRows);

  if (button.children) {
    return (
      <SubMenu key={button.order} icon={Icon} title={button.text} disabled={disabled}>
        {button.children.map((item: any) => {
          return renderSubMenu(item, handles, selectedRows);
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item
      key={button.order}
      icon={Icon}
      disabled={disabled}
      onClick={onClick(button, handles)}
    >
      {button.text}
    </Menu.Item>
  );
};

/**
 * 渲染按钮，并绑定事件
 * @param {*} button
 * @param {*} selectedRows
 */
const renderButton = (button: any, handles: any, selectedRows: any) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  // 按钮点击处理逻辑

  // 调用自定义禁用按钮事件
  const disabled = button.disable && button.disable(selectedRows);
  if (button.children) {
    const menu = (
      <Menu key={button.order}>
        {button.children.map((item: any) => {
          return renderSubMenu(item, handles, selectedRows);
        })}
      </Menu>
    );

    return (
      button.visible && (
        <Dropdown key={button.order} overlay={menu} trigger={['click']} placement="bottomCenter">
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {Icon} {button.text} {button.dropdownItem !== false && <DownOutlined />}
          </a>
        </Dropdown>
      )
    );
  }
  return (
    <span key={button.order}>
      {button.visible && (
        <Button
          type={button.type}
          icon={Icon}
          disabled={disabled}
          onClick={onClick(button, handles)}
        >
          {button.text}
        </Button>
      )}
    </span>
  );
};

/**
 * 工具栏组件
 * @param {*} props
 */
const ToolBar = (props: any) => {
  const { handles, buttons, selectedRows, filterButton = false, className = '', funCode } = props;
  if (!buttons || buttons.length === 0) {
    return null;
  }
  const toolbar = buttonFilter(buttons, funCode);
  return (
    <nav className={`${className} a-card-toolbar`}>
      {toolbar.map((item: any) => {
        return renderButton(item, handles, selectedRows);
      })}
      {filterButton && (
        <span
          style={{
            padding: '12px 8px 18px 8px',
            borderLeft: '1px solid #f0f0f0',
            background: '#fff',
          }}
        >
          <Button type="text" icon={<FilterOutlined />}>
            筛选
          </Button>
        </span>
      )}
    </nav>
  );
};

export default React.memo(ToolBar);
