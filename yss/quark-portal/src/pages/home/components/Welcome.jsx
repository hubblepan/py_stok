import React, { useState } from 'react';
import SvgIcon from '@/components/SvgIcon/index';
import { FileZipOutlined } from '@ant-design/icons';
import Background from '@/assets/bg.png';

const Welcome = () => {
  const [visible, setVisible] = useState('block');
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '120px',
          border: '16px  solid #f0f2f5',
          borderBottom: '0px',
          background: `url(${Background}) no-repeat center center`,
          backgroundSize: '100% 100%', // 记得这里100%
          padding: '8px',
          display: visible,
        }}
      >
        <div
          style={{ color: 'white', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
          onClick={() => {
            setVisible('none');
          }}
        >
          <SvgIcon icon="close" />
        </div>
        <div style={{ padding: '0 0 0 14px' }}>
          <h2 style={{ color: 'white' }}>Hi，欢迎使用赢时胜管控平台！</h2>
          <h5 style={{ color: 'white' }}>
            轻松创建、部署和管理你的指标，提升工作效率，智能监控数据风险。
            <a style={{ color: 'white', textDecoration: 'underline' }} href="#">
              <FileZipOutlined style={{ paddingRight: '16px' }} />
              开启引导
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Welcome;
