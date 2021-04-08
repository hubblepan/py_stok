import React, { useEffect, useMemo } from 'react';
import QuarkTable from '@/components/QuarkTable';
import ContextMenu from './ContextMenu';

const RenderTable = ({ menuProps, tableRender, setMenuProps, toolbar, vt, ...tableProps }) => {
  if (tableRender) {
    return tableRender(tableProps);
  }
  const handles = useMemo(() => tableProps.handles);

  return (
    <>
      <QuarkTable {...tableProps} components={vt} />
      <ContextMenu {...menuProps} setMenuProps={setMenuProps} handles={handles} toolbar={toolbar} />
    </>
  );
};
export default RenderTable;
