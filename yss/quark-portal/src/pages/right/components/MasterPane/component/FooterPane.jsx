import { Pagination } from 'antd';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';

const FooterPane = ({ pageInfo, footerRender, selectCounter, selectedRows, ...rest }) => {
  if (footerRender) {
    return footerRender(pageInfo, footerRender, rest);
  }
  if (footerRender !== false) {
    let count = 0;
    if (selectCounter) {
      count = selectCounter(selectedRows);
    } else {
      selectedRows.forEach((row) => {
        if (row.isLeaf !== false) {
          count++;
        }
      });
    }
    return (
      <footer className="a-card-footer ">
        已选&nbsp;<span style={{ color: 'blue' }}>{count}</span>&nbsp;项
      </footer>
    );
  }
  return null;
};
export default React.memo(FooterPane);

// export default React.memo(FooterPane, (prevPageInfo, newPageInfo) => {
//   return (
//     prevPageInfo.pageNo === newPageInfo.pageNo &&
//     prevPageInfo.pageSize === newPageInfo.pageSize &&
//     prevPageInfo.pageTotal === newPageInfo.pageTotal
//   );
// });
