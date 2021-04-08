import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const HeaderPane = (props: any) => {
  // console.log('HeaderPane==');
  const { tabs, extra, headerRender, children } = props;

  if (headerRender) {
    return headerRender(props);
  }
  if (tabs) {
    const {
      items,
      onChange,
      tabBarExtraContent = {
        left: <span className="px-2" />,
        right: children,
      },
      ...options
    } = tabs;
    return (
      <Tabs
        tabBarStyle={{ marginBottom: '3px' }}
        tabBarGutter={16}
        onChange={onChange}
        tabBarExtraContent={tabBarExtraContent}
        {...options}
      >
        {items.map((item: any) => (
          <TabPane tab={item.label} key={item.key} />
        ))}
      </Tabs>
    );
  }
  return (
    <header className="a-card-header" style={{ paddingRight: 0 }}>
      {extra}
      {children}
    </header>
  );
};
export default React.memo(HeaderPane);

// export default React.memo(HeaderPane, (prevProps, nextPoprs) => {
//   return true;
// });
