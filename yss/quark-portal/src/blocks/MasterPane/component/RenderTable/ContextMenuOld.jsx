import { useEffect, useMemo } from 'react';
import { Menu, Dropdown } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import { buttonFilter } from '@/handles/buttonFilter';

const { SubMenu } = Menu;

const onClick = (button, handles, currentRow) => (event) => {
  // console.log(button);
  let method = button.method;
  if (method && typeof method === 'function') {
    method.call(button, { event, button });
    return;
  } else if (!handles) {
    return;
  }
  if (method) {
    method = handles[method];
  } else {
    method = handles[button.id];
  }
  method && method.call(handles, { event, button, currentRow });
};

const renderSubMenu = (button, handles, currentRow) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  const disabled = button.disable && button.disable(currentRow);

  // if (button.id === 'edit' || 'deletes') {
  //   if (typeof button.ContextMenu === 'undefined') {
  //     button.contextMenuVisible = 1;
  //   }
  // }
  // console.log(111, button.id, button.contextMenuVisible);
  if (button.children) {
    return (
      button.contextMenuVisible && (
        <SubMenu key={button.order} icon={Icon} title={button.text} disabled={disabled}>
          {button.children.map((item) => {
            return renderSubMenu(item, handles, currentRow);
          })}
        </SubMenu>
      )
    );
  } else {
    return (
      button.contextMenuVisible && (
        <Menu.Item
          style={{ height: '30px', lineHeight: '30px' }}
          key={button.order}
          icon={Icon}
          disabled={disabled}
          onClick={onClick(button, handles, currentRow)}
        >
          {button.text}
        </Menu.Item>
      )
    );
  }
};

/**
 * 渲染按钮，并绑定事件
 * @param {*} button
 * @param {*} handles
 * @param {*} currentRow
 */
const renderButton = (button, handles, currentRow) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;

  // 调用自定义禁用按钮事件
  const disabled = button.disable && button.disable(currentRow);
  if (button.children) {
    const menu = (
      <Menu selectable={false} key={button.order}>
        {button.children.map((item) => {
          return renderSubMenu(item, handles, currentRow);
        })}
      </Menu>
    );
    return button.visible && menu;
  } else {
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
  }
};

const ContextMenu = (props) => {
  const { visible, top, left, setMenuProps, handles, currentRecord, toolbar } = props;
  const { buttons, toolbarRender, ...toolbarOptions } = toolbar;
  const _toolbar = buttonFilter(buttons);

  const ret = _toolbar.map((item) => {
    return renderButton(item, handles, currentRecord ? [currentRecord] : []);
  });

  useEffect(() => {
    if (window.__menu_clickHandler) {
      window.removeEventListener('click', window.__menu_clickHandler);
    }
    window.__menu_clickHandler = () => {
      setMenuProps({
        ...props,
        visible: false,
      });
    };

    window.addEventListener('click', window.__menu_clickHandler);
  });
  return (
    visible && (
      <div
        style={{
          background: '#fff',
          position: 'fixed',
          zIndex: 1000,
          top,
          left,
          overflow: 'hidden',
          boxShadow: '0px 0px 10px #aaa',
        }}
      >
        {ret}
      </div>
    )
  );
};

export default ContextMenu;
