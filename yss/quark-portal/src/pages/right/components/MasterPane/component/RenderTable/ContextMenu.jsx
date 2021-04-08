import { useEffect, useMemo, useRef } from 'react';
import { Menu, Dropdown } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import { buttonFilter } from '@/handles/buttonFilter';
import ReactDOM from 'react-dom';
const { SubMenu } = Menu;

const onClick = (button, handles, currentRow) => (event) => {
  // console.log(button);
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
  method && method.call(handles, { event, button, currentRow });
};

const renderItem = (button, handles, currentRow) => {
  const Icon = button.icon && <SvgIcon icon={button.icon} />;
  const disabled = button.disable && button.disable(currentRow);

  if (button.children) {
    return (
      <SubMenu key={button.order} icon={Icon} title={button.text} disabled={disabled}>
        {button.children.map((item) => {
          return renderItem(item, handles, currentRow);
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item
      style={{ height: '30px', lineHeight: '30px' }}
      key={button.order}
      icon={Icon}
      disabled={disabled}
      onClick={onClick(button, handles, currentRow)}
    >
      {button.text}
    </Menu.Item>
  );
};
const ContextMenu = (props) => {
  const { visible, top, left, setMenuProps, handles, currentRecord, toolbar } = props;
  const { contextmenus, toolbarRender } = toolbar;
  const _contextmenus = buttonFilter(contextmenus);
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
  useEffect(() => {
    let div=null
    if (visible) {
      div = document.createElement('div');
      const menu = (
        <div
          className={'aaa'}
          style={{
            background: '#fff',
            position: 'absolute',
            zIndex: 1000,
            top,
            left,
            overflow: 'hidden',
            boxShadow: '0px 0px 10px #aaa',
          }}
        >
          <Menu>
            {_contextmenus.map((item) => {
              return renderItem(item, handles, currentRecord ? [currentRecord] : []);
            })}
          </Menu>
        </div>
      );
      ReactDOM.render(menu, div);
      document.body.appendChild(div);
    }
    return () => {
      if(div){
        document.body.removeChild(div);
      }
    };
  });
  // const contextmenu=useRef(null)
  // console.log('contextmenu');
  // console.log(contextmenu);
  return null;
  // return (
  //   visible && (
  //     <div
  //       // ref={contextmenu}
  //       className={'aaa'}
  //       style={{
  //         background: '#fff',
  //         position: 'fixed',
  //         // position: 'absolute',
  //         zIndex: 1000,
  //         top,
  //         left,
  //         overflow: 'hidden',
  //         boxShadow: '0px 0px 10px #aaa',
  //       }}
  //     >
  //       <Menu>
  //         {_contextmenus.map((item) => {
  //           return renderItem(item, handles, currentRecord ? [currentRecord] : []);
  //         })}
  //       </Menu>
  //     </div>
  //   )
  // );
};

export default ContextMenu;
