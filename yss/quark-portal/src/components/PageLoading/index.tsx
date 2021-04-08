import React from 'react';
import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

const PreLoad = function () {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '420px',
        height: '100%',
        backgroundImage: 'url("/home_bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
      }}
    >
      <img src="/logo.svg" alt="logo" width="256" />
      <div style={{ paddingBottom: '98px', marginTop: '-2px' }}>
        <PageLoading />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Loading ...
      </div>
    </div>
  );
};

export default PreLoad;
