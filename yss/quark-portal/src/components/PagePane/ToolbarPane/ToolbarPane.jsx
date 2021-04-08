import ToolBar from '@/components/ToolBar';
import React from 'react';

const ToolbarPane = ({ buttons, handles, selectedRows, toolbarRender, toolbarOptions }) => {
  if (toolbarRender) {
    return toolbarRender(toolbar);
  }
  if (buttons) {
    return (
      <ToolBar
        handles={handles}
        buttons={buttons}
        selectedRows={selectedRows}
        filterButton={true}
        {...toolbarOptions}
      />
    );
  }
  return null;
};

export default React.memo(ToolbarPane);
