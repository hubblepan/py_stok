import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import Welcome from '../components/Welcome';
import CombinationMonitor from './components/CombinationMonitor.jsx';
import KeyIndicatorsMonitor from './components/KeyIndicatorsMonitor.jsx';
import ReminderCalendar from './components/Calendar.jsx';
import styles from './style.less';

const Dragmanage = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const layout = [
    { i: 'a', x: 0, y: 0, w: 7, h: 8.5, minW: 6, maxW: 7, minH: 8, static: false },
    { i: 'b', x: 7, y: 0, w: 17, h: 2.5, minW: 9, minH: 2.5 },
    { i: 'c', x: 7, y: 3, w: 17, h: 6, minW: 9, minH: 5 },
  ];

  return (
    <>
      <Welcome />
      <ResponsiveGridLayout
        className={styles.dragGrid}
        layout={layout}
        rowHeight={60}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
        margin={{ lg: [16, 16], md: [16, 16], sm: [16, 16], xs: [16, 16] }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
      >
        <div key="a" className={styles.dragItem}>
          <ReminderCalendar />
        </div>
        <div key="b" className={styles.dragItem}>
          <CombinationMonitor />
        </div>
        <div key="c" className={styles.dragItem}>
          <KeyIndicatorsMonitor />
        </div>
      </ResponsiveGridLayout>
    </>
  );
};

export default Dragmanage;
