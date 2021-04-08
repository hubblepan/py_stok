import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Table, Tooltip, Breadcrumb } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import {
  SettingOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { queryCollection, deleteCollection, deleteAll } from '@/services/collection';
import QuarkTable from '@/components/QuarkTable';
import { queryMenu } from '@/services/menuTree';
import QuarkModal from '@/components/QuarkModal';
import SvgIcon from '@/components/SvgIcon/index';
import arrayMove from 'array-move';
import styles from './index.less';

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

// 拖拽
class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    const { subData, subColumns } = props;

    this.state = {
      dataSource: subData,
      subColumns,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      // console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource, subColumns } = this.state;
    const DraggableContainer = (props) => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );
    return (
      <QuarkTable
        pagination={false}
        style={{ width: '50%' }}
        bordered={false}
        dataSource={dataSource}
        columns={subColumns}
        rowSelection={false}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
      />
    );
  }
}

const Collection = (props) => {
  const { menuData } = props;
  const [collectionVisible, setCollectionVisible] = useState(false);
  const [isCollection, setIsCollection] = useState(false);

  const settingHandle = () => {
    setCollectionVisible(true);
  };
  const handleOk = () => {
    setCollectionVisible(false);
  };

  const handleCancel = () => {
    setCollectionVisible(false);
  };

  const isCollectionHandle = () => {
    setIsCollection(!isCollection);
  };

  const [collectionData, setCollectionData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await queryCollection();
      setCollectionData(result.data.list);
    }
    fetchData();
  }, []);

  // console.log(collectionData);

  const dropContent = (
    <>
      <Menu className={styles.dropStyle}>
        {menuData.map((item) => {
          let array = item.children;
          return array.map((item1, index) => {
            if (item1.isCollection) {
              return (
                <Menu.Item key={index}>
                  <Breadcrumb>
                    <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="#">{item1.name}</a>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Menu.Item>
              );
            }
          });
        })}

        {/* <Menu.Item key="1">
          <Breadcrumb>
            <Breadcrumb.Item>父标题</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">XXXX参数设置</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Menu.Item>
        <Menu.Item key="3">
          <Breadcrumb>
            <Breadcrumb.Item>父标题</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">XXXX参数设置</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Menu.Item>
        <Menu.Item key="8">
          <Breadcrumb>
            <Breadcrumb.Item>父标题</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">XXXX参数设置</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Menu.Item> */}
      </Menu>

      <Menu>
        <Menu.Divider />
        <Menu.Item
          key="2"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div onClick={isCollectionHandle}>
            {isCollection
              ? [
                  <div key="51">
                    <SvgIcon icon="collectionColor" style={{ fontSize: '20px' }} />
                    <span>取消收藏</span>
                  </div>,
                ]
              : [
                  <div key="55">
                    <SvgIcon icon="collection" style={{ fontSize: '20px' }} />
                    <span>收藏当前页</span>
                  </div>,
                ]}
          </div>
          <SettingOutlined onClick={settingHandle} />
        </Menu.Item>
      </Menu>
    </>
  );

  const masterColumns = [
    {
      title: '菜单列表',
      dataIndex: 'name',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // 鼠标移入移出效果，移入删除
  const EditDropDown = (props) => {
    const { content, row } = props;
    const [isMouseIn, setIsMouseIn] = useState(false);
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
              <div
                style={{ marginLeft: 'auto' }}
                onClick={async () => {
                  const { id } = row;
                  try {
                    await deleteCollection({ id });
                    queryCollection().then((res) => {
                      setCollectionData(res.data);
                    });
                    return true;
                  } catch (error) {
                    return false;
                  }
                }}
              >
                <SvgIcon icon="deleteHover" />
              </div>
            </div>
          ) : (
            content
          )}
        </div>
      </>
    );
  };

  const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
  ));

  const subColumns = [
    {
      title: '快捷菜单',
      dataIndex: 'sort',
      width: 10,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="可拖拽已选改变配置列位置">
            <QuestionCircleOutlined />
          </Tooltip>
          <a
            onClick={() => {
              console.log('清空');
              deleteAll();
            }}
          >
            清空
          </a>
        </div>
      ),
      dataIndex: 'name',
      className: 'drag-visible',
      render: (text, record, index) => {
        return <EditDropDown content={text} row={record} />;
      },
    },
  ];

  return (
    <>
      <div className={styles.action}>
        <Dropdown overlay={dropContent} placement="bottomRight" trigger={['click']} arrow>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ marginTop: '4px', marginLeft: '8px' }}
          >
            <SvgIcon
              icon="collection"
              options={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
          </a>
        </Dropdown>
      </div>

      {/* 收藏弹框 */}
      <QuarkModal
        title="快捷菜单配置"
        visible={collectionVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ display: 'flex', width: '100%' }}
      >
        <QuarkTable
          rowKey="id"
          destroyOnClose
          style={{ width: '50%' }}
          columns={masterColumns}
          dataSource={menuData}
          rowSelection={{ ...rowSelection, checkStrictly: false }}
          expandable={{
            defaultExpandAllRows: true,
            expandIcon: ({ expanded, onExpand, record }) => {
              if (record.isLeaf) {
                return null;
              }
              return expanded ? (
                <CaretDownOutlined
                  style={{ marginRight: '8px' }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <CaretRightOutlined
                  style={{ marginRight: '8px' }}
                  onClick={(e) => onExpand(record, e)}
                />
              );
            },
          }}
          scroll={{ y: 500 }}
        />
        <SortableTable subData={collectionData} subColumns={subColumns} />
      </QuarkModal>
    </>
  );
};

export default Collection;
