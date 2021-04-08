import React from 'react';

const HeaderPane = ({ title, toolbarDom, headerRender }) => {
  if (headerRender) {
    return headerRender({ title, toolbarDom });
  }
  if (title) {
    return (
      <header className="a-card-header">
        <h6 className="h6">{title}</h6>
      </header>
    );
  }
  return null;
};
export default React.memo(HeaderPane);

// export default React.memo(HeaderPane, (prevProps, nextPoprs) => {
//   return true;
// });
