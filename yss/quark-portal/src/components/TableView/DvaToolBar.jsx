import React, { memo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';

import SvgIcon from '@/components/SvgIcon/index';
import { buttonFilter } from '@/handles/buttonFilter';

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
    let method = button.method;
    if (method && typeof method === 'function') {
      method.call(button, event, button);
      return;
    } else if (!handles) {
      return;
    }
    if (method) {
      method = handles[method];
    } else {
      method = handles[button.id];
    }
    method && method.call(handles, event, button);
  };
  // 调用自定义禁用按钮事件
  const disabled = handles && handles.getButtonState(button);
  if (button.children) {
    const menu = (
      <Menu key={button.order}>
        {button.children.map((item) => {
          return renderSubMenu(item, handles);
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
  } else {
    return (
      <span key={button.order}>
        {button.visible && (
          <Button type={button.type} icon={Icon} disabled={disabled} onClick={onClick}>
            {button.text}
          </Button>
        )}
      </span>
    );
  }
};

// // 按钮栏
// const _Toolbar = memo(({ buttons, selectedRowKeys }) => {
//   console.log(222, 'toolbar渲染');
//   return (
//     <>
//       {buttons.map((btn, i) => {
//         return (
//           <Button
//             disabled={btn.disabled(selectedRowKeys)}
//             key={i}
//             onClick={btn.onClick}
//             type="text"
//           >
//             {btn.text}
//           </Button>
//         );
//       })}
//     </>
//   );
// });

const renderSubMenu = (button, handles) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  const disabled = handles && handles.getButtonState(button);

  if (button.children) {
    return (
      <SubMenu key={button.order} icon={Icon} title={button.text} disabled={disabled}>
        {button.children.map((item) => {
          return renderSubMenu(item, handles);
        })}
      </SubMenu>
    );
  } else {
    const onClick = (event) => {
      if (!handles) {
        return;
      }
      const methodName = button.method;
      const method = handles[methodName];
      method && method.call(handles, event, button);
    };
    return (
      <Menu.Item key={button.order} icon={Icon} disabled={disabled} onClick={onClick}>
        {button.text}
      </Menu.Item>
    );
  }
};

/**
 * 工具栏组件
 * @param {*} props
 */
const ToolBar = memo((props) => {
  const { handles, buttons, filterButton = false, className = '' } = props;
  const toolbar = buttonFilter(buttons);
  console.log(222, 'toolbar渲染', props);
  return (
    <nav className={`${className} a-card-toolbar`}>
      {toolbar.map((item) => {
        return renderButton(item, handles);
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
});

export default ToolBar;
