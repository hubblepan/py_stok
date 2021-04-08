import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import styles from './style.less';
import { queryGuide, checkParams } from '../services/noviceGuide';

const NoviceGuide = () => {
  // 获得遮罩层的自适应高度
  const [maskHeight, setMaskHeight] = useState(0);
  const [maskWidth, setMaskWidth] = useState(0);

  const onResizeMask = useCallback(() => {
    const { innerHeight } = window;
    const { innerWidth } = window;

    const height = innerHeight - 78;
    const width = innerWidth - 78;
    // const height = document.getElementsByTagName('main')[0].clientHeight;

    // console.log(height);
    setMaskHeight(height + 78);
    setMaskWidth(width + 78);
    // const innerWidth = window.innerWidth;
    // const innerHeight = window.innerHeight;
    // let scale = Math.min(innerWidth / 1600, innerHeight / 900);
    // scale = Math.floor(scale * 100) / 100;
    // setLsdScale(scale);
  }, []);

  useEffect(() => {
    onResizeMask();
    window.addEventListener('resize', onResizeMask);

    return () => {
      window.removeEventListener('resize', onResizeMask);
    };
  }, []);

  // 假设登录的用户id为111
  const userId = '111';

  // 校验用户是否是第一次登录
  // const [guideData, setGuideData] = useState([]);
  const [flag, setFlag] = useState('none');
  useEffect(() => {
    async function fetchData() {
      const result = await queryGuide({ params: userId });
      // console.log(result.data);
      // setGuideData(result.data);
      const index = result.data.findIndex((item) => item.id === userId);
      // console.log(index);
      // console.log(result.data[index].isHasLogin);
      if (result.data[index].isHasLogin === 0) {
        setFlag('block');
      } else {
        setFlag('none');
      }
    }
    fetchData();
  }, []);

  // console.log(guideData);
  // console.log(flag);

  // console.log(maskHeight);
  // console.log(maskWidth);
  // const [maskVisible0, setMaskVisible0] = useState(flag);
  const [maskVisible1, setMaskVisible1] = useState('none');
  const [maskVisible2, setMaskVisible2] = useState('none');
  const [maskVisible3, setMaskVisible3] = useState('none');
  const [maskVisible4, setMaskVisible4] = useState('none');
  const [maskVisible5, setMaskVisible5] = useState('none');

  return (
    <>
      {/* 1:遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: `${maskWidth - 240 - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: '240px solid rgba(0, 0, 0, 0.5)',
          display: flag,
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>

      {/* 1:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          // color: 'white',
          top: '60px',
          left: '250px',
          width: '250px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: flag,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            left: '20px',
            zIndex: '9999',
          }}
        />
        点击图标可收起菜单区域，再次点击可固定展开菜单哦~
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setFlag('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setFlag('none');
              setMaskVisible1('block');
            }}
          >
            下一项
          </Button>
        </div>
      </div>

      {/* 2:下一项 */}
      {/* 遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: '246px solid rgba(0, 0, 0, 0.5)',
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: `${maskWidth - 248 - 48}px solid rgba(0, 0, 0, 0.5)`,
          display: maskVisible1,
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>
      {/* 2:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          top: '60px',
          right: '250px',
          width: '250px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: maskVisible1,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            right: '40px',
            zIndex: '9999',
          }}
        />
        点击图标可展开消息池，查看系统通知、指标监控消息提醒等~
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setMaskVisible1('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            size="small"
            onClick={() => {
              setFlag('block');
              setMaskVisible1('none');
            }}
          >
            上一项
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setMaskVisible2('block');
              setMaskVisible1('none');
            }}
          >
            下一项
          </Button>
        </div>
      </div>

      {/* 3:下一项 */}
      {/* 遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: '196px solid rgba(0, 0, 0, 0.5)',
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: `${maskWidth - 198 - 48}px solid rgba(0, 0, 0, 0.5)`,
          display: maskVisible2,
          overflow: 'hidden',
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>
      {/* 3:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          top: '60px',
          right: '200px',
          width: '250px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: maskVisible2,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            right: '10px',
            zIndex: '9999',
          }}
        />
        点击图标展开任务进度池，可查看任务进度执行情哦~
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setMaskVisible2('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            size="small"
            onClick={() => {
              setMaskVisible1('block');
              setMaskVisible2('none');
            }}
          >
            上一项
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setMaskVisible3('block');
              setMaskVisible2('none');
            }}
          >
            下一项
          </Button>
        </div>
      </div>

      {/* 4:下一项 */}
      {/* 遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: '146px solid rgba(0, 0, 0, 0.5)',
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: `${maskWidth - 148 - 48}px solid rgba(0, 0, 0, 0.5)`,
          display: maskVisible3,
          overflow: 'hidden',
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>
      {/* 4:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          top: '60px',
          right: '155px',
          width: '260px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: maskVisible3,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            right: '10px',
            zIndex: '9999',
          }}
        />
        点击图标可跳转至帮助中心查看产品的新手指引、常见问题、更新日志哦～
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setMaskVisible3('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            size="small"
            onClick={() => {
              setMaskVisible2('block');
              setMaskVisible3('none');
            }}
          >
            上一项
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setMaskVisible4('block');
              setMaskVisible3('none');
            }}
          >
            下一项
          </Button>
        </div>
      </div>

      {/* 5:下一项 */}
      {/* 遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: '96px solid rgba(0, 0, 0, 0.5)',
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: `${maskWidth - 96 - 48}px solid rgba(0, 0, 0, 0.5)`,
          display: maskVisible4,
          overflow: 'hidden',
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>
      {/* 5:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          top: '60px',
          right: '155px',
          width: '260px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: maskVisible4,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            right: '10px',
            zIndex: '9999',
          }}
        />
        点击图标可对页面进行收藏与管理，方便之后快捷进入哦~
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setMaskVisible4('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            size="small"
            onClick={() => {
              setMaskVisible3('block');
              setMaskVisible4('none');
            }}
          >
            上一项
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setMaskVisible5('block');
              setMaskVisible4('none');
            }}
          >
            下一项
          </Button>
        </div>
      </div>

      {/* 6:下一项 */}
      {/* 遮罩层 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '1000',
          width: maskWidth,
          height: maskHeight,
          borderTop: '0 solid rgba(0, 0, 0, 0.5)',
          borderRight: '48px solid rgba(0, 0, 0, 0.5)',
          borderBottom: `${maskHeight - 48}px solid rgba(0, 0, 0, 0.5)`,
          borderLeft: `${maskWidth - 48 - 48}px solid rgba(0, 0, 0, 0.5)`,
          display: maskVisible5,
          overflow: 'hidden',
        }}
      >
        <div className={styles.maskStyle1} />
        <div className={styles.maskStyle2} />
      </div>
      {/* 6:提示框 */}
      <div
        style={{
          position: 'absolute',
          zIndex: '9999',
          top: '60px',
          right: '56px',
          width: '260px',
          height: '108px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '10px',
          display: maskVisible5,
        }}
      >
        {/* 三角箭头 */}
        <div
          style={{
            width: 0,
            height: 0,
            border: '8px solid',
            borderColor: 'transparent transparent white',
            position: 'absolute',
            top: '-16px',
            right: '10px',
            zIndex: '9999',
          }}
        />
        点击图标进行岗位切换、密码重置、查看个人信息、退出登录等操作~
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            type="text"
            size="small"
            onClick={async () => {
              setMaskVisible5('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            跳过
          </Button>
          &nbsp;&nbsp;
          <Button
            size="small"
            onClick={() => {
              setMaskVisible4('block');
              setMaskVisible5('none');
            }}
          >
            上一项
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            size="small"
            onClick={async () => {
              setMaskVisible5('none');
              // 传入用户id，把isHasLogin设置1（表示已登录）
              await checkParams({ id: userId });
            }}
          >
            完成
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoviceGuide;
