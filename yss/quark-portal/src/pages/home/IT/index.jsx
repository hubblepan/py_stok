import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ErrorDetail from './components/ErrorDetail.jsx';
import styles from './style.less';

const Dragmanage = () => {
  const ReactGridLayout = WidthProvider(RGL);
  const layout = [
    { i: 'a', x: 0, y: 0, w: 12, h: 1 },
    { i: 'b', x: 0, y: 1, w: 12, h: 2 },
  ];
  return (
    <>
      <ReactGridLayout
        className={styles.dragGrid}
        layout={layout}
        cols={12}
        rows={12}
        margin={[16, 16]}
        rowHeight={180}
        width={1200}
      >
        <div key="a" className={styles.dragItem} style={{height:100,width:100, background:'#fff', overflow:'auto'}}>
          <div style={{height:300,width:300,}}>sds</div>
        </div>
        <div key="b" className={styles.dragItem}>
          <div style={{height:100,width:100, background:'#000c17', overflow:'auto'}}>
            <div style={{height:300,width:300,}}>sds</div>
          </div>
          <div style={{height:100,width:100, background:'#f30', overflow:'auto'}}>
            <div style={{height:300,width:300,}}>sds</div>
          </div>
          <div style={{height:100,width:100, background:'#1890ff', overflow:'auto'}}>
            <div style={{height:300,width:300,}}>sds</div>
          </div>
          <ErrorDetail />
        </div>
      </ReactGridLayout>
    </>
  );
};

export default Dragmanage;
