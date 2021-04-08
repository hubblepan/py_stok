
import { useState } from 'react';
import {
  FolderAddOutlined
} from '@ant-design/icons';
import { Popover } from 'antd';
import DFrom from './DForm';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      visible={visible}
      onVisibleChange={(visible) => { setVisible(visible) }}
      trigger="click" placement="bottom"
      content={<DFrom setVisible={setVisible} />}
      title="新增分类">
      <FolderAddOutlined />
    </Popover>
  )
}