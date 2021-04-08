import React from 'react';
import styles from './style.less';

const Combintion = (props) => {
  const { listRandom } = props;
  return listRandom.map((item, index) => {
    return (
      <div style={{ display: 'flex' }} key={index}>
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: `${listRandom[index].color}`,
            margin: '10px 10px',
          }}
        />
        <div>
          <div className="h7">{listRandom[index].type}</div>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>{listRandom[index].amount}</div>
          <div className={styles.percentage}>整体占比&nbsp;{listRandom[index].percentage}%</div>
        </div>
      </div>
    );
  });
};

export default Combintion;
