import RGL, { WidthProvider, Responsive } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import { Button, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import request from '@/utils/request';
import styles from './index.less';
import AccountCombination from './components/AccountCombination';
import CombinationMonitor from './components/CombinationMonitor';
import CombinationTrend from './components/CombinationTrend';
import RankTop from './components/RankTop';

const Homemanage = () => {
  const [layoutlg, setLayoutlg] = useState([]);
  const [layoutsm, setLayoutsm] = useState([]);
  const [breakpoint, setBreakpoint] = useState('lg'); // 初始值是lg

  const ResponsiveGridLayout = WidthProvider(Responsive);
  // const layout = [
  //   { i: 'a', x: 0, y: 0, w: 24, h: 3 },
  //   { i: 'b', x: 0, y: 3, w: 24, h: 6 },
  //   { i: 'c', x: 0, y: 9, w: 18, h: 6 },
  //   { i: 'd', x: 18, y: 9, w: 6, h: 6, },
  //   // rowHeight={10} 但是高度改变有问题
  // ];
  // let layout = [
  //   { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
  //   { i: 'b', x: 0, y: 3, w: 24, h: 17 },
  //   { i: 'c', x: 0, y: 9, w: 18, h: 16 },
  //   { i: 'd', x: 18, y: 15, w: 6, h: 16 },
  //   // rowHeight={10} 但是高度改变有问题
  // ];
  // const layoutsm = [
  //   { i: 'a', x: 0, y: 0, w: 24, h: 8.54 },
  //   { i: 'b', x: 0, y: 3, w: 24, h: 17 },
  //   { i: 'c', x: 0, y: 9, w: 24, h: 16 },
  //   { i: 'd', x: 18, y: 15, w: 24, h: 16 },
  // ];
  /**
   * 特别注意：用了响应式之后所有的属性都要{lg:xxx, md:xxx, sm:xxx ...}
   */
  const [layout, setLayout] = useState([]);
  const [layouts, setLayouts] = useState({});
  const [dragLoading, setDragLoading] = useState(false);
  const fetchLayout = () => {
    setDragLoading(true);
    request
      .post('/ocp/home/layouts/query')
      .then((response) => {
        setLayoutlg(response.data.layoutlg);
        setLayoutsm(response.data.layoutsm);
        setDragLoading(false);
      })
      .catch(() => {
        setDragLoading(false);
      });
  };
  useEffect(() => {
    fetchLayout();
  }, []);
  const onLayoutChange = useCallback((layout, layouts) => {
    console.log('onLayoutChange');
    console.log(layout);
    console.log(layouts);
    localStorage.setItem('layout', JSON.stringify(layout));
    localStorage.setItem('layouts', JSON.stringify(layouts));
    // layout:当前布局
    // setLayout(layout);
    // setLayouts(layouts);

    // saveToLS("layouts", layouts);
    // this.setState({ layouts });
  }, []);
  const [saveLoading, setSaveLoading] = useState(false);
  const saveLayouts = () => {
    /**
     * 1.位置信息
     * 统一的，大分辨率改了小分辨率也改了
     */
    if (!layoutlg || !layoutlg.length) return;
    const layoutlgCopy = layoutlg.slice(0, layoutlg.length);
    const layoutsmCopy = layoutsm.slice(0, layoutsm.length);
    const layout = JSON.parse(localStorage.getItem('layout'));
    const layouts = JSON.parse(localStorage.getItem('layouts'));
    // layout.forEach((item, index) => {
    //   layoutlgCopy[index].x = item.x;
    //   layoutlgCopy[index].y = item.y;
    //   layoutsmCopy[index].x = item.x;
    //   layoutsmCopy[index].y = item.y;
    // });
    /**
     * 2.大小信息
     * lg的用lg的，sm的用sm的
     *
     */
    layouts.lg.forEach((item, index) => {
      layoutlgCopy[index].w = item.w;
      layoutlgCopy[index].h = item.h;
      layoutlgCopy[index].x = item.x;
      layoutlgCopy[index].y = item.y;
    });
    layouts.sm.forEach((item, index) => {
      layoutsmCopy[index].w = item.w;
      layoutsmCopy[index].h = item.h;
      layoutsmCopy[index].x = item.x;
      layoutsmCopy[index].y = item.y;
    });
    setLayoutlg(layoutlgCopy);
    setLayoutsm(layoutsmCopy);
    setSaveLoading(true);
    request('/ocp/home/layouts/save', {
      method: 'post',
      data: { layoutlg: layoutlgCopy, layoutsm: layoutsmCopy },
    })
      .then(() => {
        setSaveLoading(false);
        // fetchLayout();
      })
      .catch(() => {
        setSaveLoading(false);
      });
  };
  useEffect(() => {
    console.log('========layoutlg');
    console.log(layoutlg);
    console.log('========layoutsm');
    console.log(layoutsm);
  }, [layoutlg]);
  const calcH = (rowHeight, marginY, actualHeight) => {
    const h = (actualHeight + marginY) / (rowHeight + marginY);
    return h;
  };

  return (
    <>
      {/* >其值的才叫lg */}
      <Button
        type="primary"
        style={{ position: 'absolute', top: 4, right: 96 }}
        loading={saveLoading}
        onClick={() => {
          saveLayouts();
        }}
      >
        保存
      </Button>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 4, right: 16 }}
        // loading={saveLoading}
        onClick={() => {
          request('/ocp/home/layouts/reset', {
            method: 'post',
          }).then(() => {
            fetchLayout();
          });
        }}
      >
        重置
      </Button>
      <Spin spinning={dragLoading} style={{ minHeight: '300px' }}>
        {layoutlg.length && layoutsm.length && (
          <ResponsiveGridLayout
            className={`layout ${styles.dragGrid}`}
            draggableHandle=".ant-card-head,.ant-tabs-nav"
            rowHeight={10}
            // breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} 默认值
            // breakpoints={{ lg: 950, md: 746, sm: 518, xs: 230, xxs: 0 }}
            breakpoints={{ lg: 950, sm: 746 }}
            onLayoutChange={onLayoutChange}
            // layouts={{ lg: layoutlg, md: layoutsm, sm: layoutsm, xs: layoutsm, xxs: layoutsm }}
            layouts={{ lg: layoutlg, sm: layoutsm }}
            margin={{ lg: [16, 16], sm: [16, 16] }}
            cols={{ lg: 24, sm: 20 }}
          >
            <div key="a" className={styles.dragItem}>
              <AccountCombination />
            </div>
            <div key="b" className={styles.dragItem}>
              <CombinationMonitor />
            </div>
            <div key="c" className={styles.dragItem}>
              <CombinationTrend />
            </div>
            <div key="d" className={styles.dragItem}>
              <RankTop />
            </div>
          </ResponsiveGridLayout>
        )}
      </Spin>
    </>
  );
};

export default Homemanage;
