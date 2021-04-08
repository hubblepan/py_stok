import React, { useRef, useEffect, useMemo } from 'react';
import MasterPane from '@/blocks/MasterPane';
import TablePane from '@/blocks/TablePane';
import SplitPane from 'react-split-pane';
import ToolBar from '@/components/ToolBar';
import HeaderPane from '@/components/PagePane/HeaderPane';

const PagePane = (props) => {
  const {
    header,
    masterTable,
    subTable,
    masterModel,
    subModel,
    subHandle,
    masterHandle,
    children,
    split = {},
    hide,
  } = props;
  const {
    minSize = 260,
    maxSize = 600,
    direction = 'vertical',
    paneStyle = { overflow: 'auto' },
  } = split;
  const { funCode, filterButton, handles } = subTable;
  const { selectedRows } = subModel;
  // console.log('======PagePane', selectedRows);

  return (
    <section className={`${hide ? 'hidden' : ''} page-wrapper a-card`}>
      {header && (
        <HeaderPane {...header}>
          <ToolBar
            handles={handles}
            selectedRows={selectedRows}
            filterButton={filterButton}
            funCode={funCode}
            {...header.toolbar}
          />
        </HeaderPane>
      )}
      <div className="a-card">
        <SplitPane split={direction} minSize={minSize} maxSize={maxSize} paneStyle={paneStyle}>
          <MasterPane hide={hide} {...masterTable} {...masterModel} handles={masterHandle} />
          <TablePane hide={hide} filterButton {...subTable} {...subModel} handles={subHandle} />
        </SplitPane>
      </div>
      {children}
    </section>
  );
};

export default PagePane;
