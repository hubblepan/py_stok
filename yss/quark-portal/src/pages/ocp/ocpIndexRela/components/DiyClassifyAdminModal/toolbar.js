import DPopover from './components/DPopover'



export const masterToolbar = {
  buttons: {
    file: {
      icon: <DPopover />,
      dropdownItem: false,
      visible: 1,
      children: {
      }
    }
  }
}

export const subToolbar = {
  buttons: {
    add: {
      text: '新增',
      visible: true,
      method: 'add',
      order: 99,
    },
    deletes: {
      text: '删除',
      method: 'deletes',
      visible: true,
      order: 100,
    },
    check: {
      id: 'check',
      text: '审核',
      method: 'check',
      visible: true,
    },
    uncheck: {
      id: 'uncheck',
      text: '反审核',
      method: 'uncheck',
      visible: true,
    },
    search: false
  },
};

