import QuarkTable from '@/components/QuarkTable';
import ContextMenu from './ContextMenu';
import { useEffect, useMemo } from 'react';

const RenderTable = ({ tableProps, menuProps, tableRender, setMenuProps, toolbar, vt }) => {
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
