// 消息提示

import { InfoCircleTwoTone } from '@ant-design/icons';

export default (props) => {

  const { type, content } = props;

  return (<div style={{ height: '50px', padding: '10px 20px' }}>
    <div
      style={{
        height: '30px',
        lineHeight: '30px',
        background: type == 'info' ? '#e6eeff' : '#fefefe',
        paddingLeft: '10px',
      }}
    >
      <InfoCircleTwoTone />
    &nbsp;<span>{content}&nbsp;&nbsp;</span>
    </div>
  </div>)
}