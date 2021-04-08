import {
  Drawer,
} from 'antd';

// 详情专供，侧边弹框
export default (props) => {

  const { visible, title, onClose, onCancel, footer } = props

  return <div
    id="quarkDrawer"
    style={{
      // display: detailVisible ? 'block' : 'none',
      position: 'fixed',
      width: visible ? '704px' : 0,
      top: '105px',
      right: '20px',
      bottom: '60px',
      zIndex: 10000,
      overflow: 'hidden',
      transition: 'width 0.1s',
      transform: 'rotate(0deg)',
    }}
  >
    <Drawer
      // className={css['ant-drawer']}
      getContainer={document.querySelector('#drawerWrap')}
      // className={css['quark-drawer']}
      title={title}
      visible={visible}
      getContainer={false}
      destroyOnClose
      maskStyle={{ display: 'none' }}
      width={700}
      // closable={false}
      drawerStyle={{ maxHeight: '780px', overflowY: 'auto' }}
      onClose={onClose}
      footer={
        footer
      }
      onCancel={onCancel}
    >
      {props.children}
    </Drawer>

  </div>
}