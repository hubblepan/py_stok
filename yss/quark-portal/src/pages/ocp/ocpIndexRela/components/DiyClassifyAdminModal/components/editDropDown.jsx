import { useState, useContext } from 'react';
import Context from '../createContext';
import { Button, Form, Input, Row, Col, message, Pagination, Menu, Dropdown, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import {
  querySubTable,
  saveMasterTable,
  deleteMasterTable,
  queryMasterTable,
  checkMasterTable,
  uncheckMasterTable,
} from '../diyClassifyService';

import MsgBox from '@/utils/MsgBox';

export default (props) => {
  const state = useContext(Context);

  const { content, row } = props;
  // console.log(props.callback());
  const [isMouseIn, setIsMouseIn] = useState(false);

  const handles = {
    check: (e) => {
      e.preventDefault();
      MsgBox.confirm({
        title: '审核',
        content: '是否确定审核未审核的记录？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          try {
            const res = await checkMasterTable({ id: row.id });
            MsgBox.success({ message: res.message });
          } catch (e) {
            MsgBox.error({ message: '审核数据失败' });
          }
        },
      });
    },
    uncheck: (e) => {
      e.preventDefault();
      MsgBox.confirm({
        title: '反审核',
        content: '是否确定反审核未审核的记录？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          try {
            const res = await uncheckMasterTable({ id: row.id });
            MsgBox.success({ message: res.message });
          } catch (e) {
            MsgBox.error({ message: '反审核失败' });
          }
        },
      });
    },
    deletes: (e) => {
      e.preventDefault();
      MsgBox.confirm({
        title: '删除',
        content: '是否确定删除未审核的记录，删除后不可恢复',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          try {
            const res = await deleteMasterTable({ id: row.id });
            MsgBox.success({ message: res.message });
          } catch (e) {
            MsgBox.error({ message: '删除数据失败' });
          }
        },
      });
    },
    save: async (e) => {
      try {
        const res = await saveMasterTable({ id: row.id });
        MsgBox.success({ message: res.message });
      } catch (e) {
        MsgBox.error({ message: '保存数据失败' });
      }
    },
  };

  const isChecked = !!row.check;

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          type="text"
          disabled={isChecked ? true : false}
          rel="noopener noreferrer"
          href="#"
          onClick={handles.check}
        >
          审核
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          disabled={!isChecked ? true : false}
          rel="noopener noreferrer"
          href="#"
          onClick={handles.uncheck}
        >
          反审核
        </Button>
      </Menu.Item>
      <Divider style={{ margin: 0, padding: 0 }} />
      <Menu.Item>
        <Button
          type="text"
          disabled={isChecked ? true : false}
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            state.setMasterRowEditData(row);
            window.setTimeout(() => {
              state.setMasterRowVisible(true);
            });
          }}
        >
          修改
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          disabled={isChecked ? true : false}
          rel="noopener noreferrer"
          href="#"
          onClick={handles.deletes}
        >
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div onMouseEnter={() => setIsMouseIn(true)} onMouseLeave={() => setIsMouseIn(false)}>
        {isMouseIn ? (
          <div
            style={{ display: 'flex' }}
            href="#"
            onClick={(e) => {
              e.preventDefault;
            }}
          >
            <span>{content}</span>
            <div style={{ marginLeft: 'auto' }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <MoreOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        ) : (
          content
        )}
      </div>
    </>
  );
};
