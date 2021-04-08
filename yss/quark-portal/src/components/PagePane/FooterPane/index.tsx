import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import { Pagination } from 'antd';

const FooterPane = ({ pageInfo, changePage, footerRender, ...rest }) => {
  // console.log('FooterPane==');
  if (footerRender) {
    return footerRender(pageInfo, footerRender, rest);
  }

  const isPage = pageInfo && pageInfo.pageSize && pageInfo.pageNo;

  return isPage ? (
    <footer className="a-card-footer flex-right">
      <Pagination
        style={{ height: 22, lineHeight: '20px', paddingRight: 16 }}
        size="small"
        showSizeChanger
        showQuickJumper
        pageSizeOptions={['20', '50', '100', '500', '1000', '5000']}
        defaultPageSize={20}
        pageSize={pageInfo.pageSize}
        defaultCurrent={pageInfo.pageNo}
        total={pageInfo.pageTotal}
        showTotal={(total) => `共 ${total} 项`}
        current={pageInfo.pageNo}
        onChange={changePage}
      />
    </footer>
  ) : null;
};
export default React.memo(FooterPane);

// export default React.memo(FooterPane, (prevPageInfo, newPageInfo) => {
//   return (
//     prevPageInfo.pageNo === newPageInfo.pageNo &&
//     prevPageInfo.pageSize === newPageInfo.pageSize &&
//     prevPageInfo.pageTotal === newPageInfo.pageTotal
//   );
// });
