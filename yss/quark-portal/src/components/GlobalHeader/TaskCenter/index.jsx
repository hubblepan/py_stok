// import styles from '@/components/NoticeIcon/index.less';
import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Dropdown, List, Menu, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';
import DetailModal from '@/pages/task/components/DetailModal';
import { useHistory } from 'react-router-dom';
import styles from './style.less';
import index from '../index.less';
import { queryTask } from './service';

const { Option } = Select;

const TaskCenter = (props) => {
  // const { count = 11 } = props;
  const [visible, setVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const params = {
      date: '1',
    };
    queryTask(params).then((response) => {
      setTaskList(response.data.list);
    });
  }, []);
  const count = useMemo(() => {
    return taskList.length;
  }, [taskList]);
  const TaskIcon = (
    <SvgIcon
      icon="taskcenter"
      style={{ padding: '4px', verticalAlign: 'middle', fontSize: '26px' }}
    />
  );
  const trigger = (
    <span
    // className={classNames(noticeButtonClass, {
    //   opened: visible,
    // })}
    >
      <Badge
        count={count}
        // style={{
        //   boxShadow: 'none',
        // }}
        // className={styles.badge}
      >
        {TaskIcon}
      </Badge>
    </span>
  );

  const [taskDate, setTaskDate] = useState('今日任务');
  const menu = (
    <Menu
      onClick={({ item, key }) => {
        const params = {
          date: key,
        };
        queryTask(params).then((response) => {
          setTaskList(response.data.list);
        });
      }}
    >
      <Menu.Item key="1" title="今日任务">
        今日任务
      </Menu.Item>
      <Menu.Item key="0" title="全部任务">
        全部任务
      </Menu.Item>
    </Menu>
  );
  const TaskItem = ({ item, setId, setVisible }) => {
    const { title, description, time, type, amount, total, success, fail, id } = item;
    return (
      <div
        className={`${styles.taskItem} ${type ? styles.hover : ''}`}
        onClick={() => {
          if (type) {
            setId(id);
            setVisible(true);
          }
        }}
      >
        <div className={styles.title}>
          <div>{type ? '指标执行已完成' : '正在执行指标，请稍候...'}</div>
          {type === 1 ? (
            <div className={styles.done}>已完成</div>
          ) : (
            <div className={styles.doing}>
              进行中 {amount}/{total}
            </div>
          )}
        </div>
        {type ? (
          <div className={styles.description}>
            成功<span className="text-primary fw-bold"> {success} </span>条；失败
            <span className="text-danger fw-bold"> {fail} </span>条
          </div>
        ) : null}
        <div className={styles.time}>{time}</div>
      </div>
    );
  };
  const [detailVisible, setDetailVisible] = useState(false);
  const [id, setId] = useState('');
  const goTask = () => {
    history.push('/monitor/task');
  };
  return (
    <Dropdown
      className={index.action}
      placement="bottomRight"
      arrow
      overlay={
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 3px 8px 0px rgba(0,0,0,0.22)',
            width: '360px',
          }}
        >
          <div
            style={{ height: '60px', borderBottom: '1px solid #f0f0f0' }}
            className="px-5 py-4"
          >
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
              <a onClick={(e) => e.preventDefault()}>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{taskDate}</span>
                <CaretDownOutlined className="ml-1" />
              </a>
            </Dropdown>
            {/* <Select defaultValue="1" style={{ width: 120 }} bordered={false}> */}
            {/*  <Option value="1">今日任务</Option> */}
            {/*  <Option value="0">全部任务</Option> */}
            {/* </Select> */}
            <div
              className="text-secondary float-right"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                goTask();
              }}
            >
              任务中心
            </div>
            {/* <Button type="text" className="text-secondary float-right" >任务中心</Button> */}
          </div>
          <List
            style={{
              maxHeight: '580px',
              overflowY: 'auto',
            }}
            dataSource={taskList}
            renderItem={(item) => (
              <List.Item className="mx-3 py-3">
                <TaskItem item={item} setId={setId} setVisible={setDetailVisible} />
              </List.Item>
            )}
          />
          <DetailModal visible={detailVisible} setVisible={setDetailVisible} id={id} />
        </div>
      }
      // overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </Dropdown>
  );
};
export default TaskCenter;
