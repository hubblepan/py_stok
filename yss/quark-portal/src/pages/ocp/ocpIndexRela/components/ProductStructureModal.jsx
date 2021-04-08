import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Modal, Transfer, Select, Row, Col, Table, Checkbox, Button } from 'antd';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';
import SplitPane from 'react-split-pane';
import QuarkTable from '@/components/QuarkTable';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { queryClassify, queryCombination, saveStructure } from './EditService';
import styles from './style.less';

const ProductStructureModal = (props) => {
  const { structureVisible, setStructureVisible, handles } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checked, setChecked] = useState(true);
  const [classifyList, setClassifyList] = useState(null);
  const [combinationList, setCombinationList] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [tableHeight, setTableHeight] = useState(560);
  const tableWrapper = useRef(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [columnsRight, setColumnsRight] = useState([
    { dataIndex: 'combinationName', title: '组合名称' },
    { dataIndex: 'combinationCode', title: '组合代码' },
  ]);
  const onExpand = (expanded, record) => {
    if (expanded) {
      // 设置展开-把当前id值push进去
      const origExpandedRows = expandedRows.slice(0, expandedRows.length);
      origExpandedRows.push(record.id);
      setExpandedRows(origExpandedRows);
    } else {
      // 设置折叠-过滤掉当前id
      setExpandedRows(
        expandedRows.filter((item) => {
          return item !== record.id;
        }),
      );
    }
  };
  const expandLevel = (expandedLevel, dataSource) => {
    /**
     * 尤其注意：
     * 使用expandedRowKeys属性控制table的展开时，一定要和onExpand配合使用
     */
    let depth = 0;
    const newExpandedKeys = [];
    const expand = (treeData, currentLevel) => {
      // 根据expandedLevel来控制最大"展开层级"。为0代表"全部展开"
      if (currentLevel >= expandedLevel && expandedLevel) {
        return newExpandedKeys;
      }
      if (expandedLevel === 0) {
        // 初始"全部展开"时计算"最大层级"
        depth = Math.max(depth, currentLevel);
      }
      // 递归遍历
      treeData.map((item) => {
        newExpandedKeys.push(item.id);
        // 但是要考虑到空分类的情况
        if (item.children || (!item.children && !item.isLeaf)) {
          expand(item.children || [], currentLevel + 1);
        }
      });
      return newExpandedKeys;
    };
    setExpandedRows(expand(dataSource, 1));
    // if (expandedLevel === 0) {
    //   setTotalLevel(depth);
    // }
  };
  const fetchSubTable = (id = '') => {
    setLoading2(true);
    setTimeout(() => {
      queryCombination({ id })
        .then((response) => {
          setLoading2(false);
          setCombinationList(response.data.list || []);
          expandLevel(0, response.data.list || []);
          /**
           * 要注意：如果说要做动态列的话，必须使用.push(.splice)能改变原数组的方法，
           * 使用setState无效
           */
          // console.log(response.data);
          // columnsRight.length = 0;
          // columnsRight.push(...response.data.columns);
          // setColumnsRight(response.data.columns);
        })
        .catch(() => {
          setLoading2(false);
        });
    }, 1000);
  };
  useEffect(() => {
    if (structureVisible) {
      setLoading1(true);
      setTimeout(() => {
        queryClassify()
          .then((response) => {
            setLoading1(false);
            setSelectedId(response.data.list[0].id);
            setClassifyList(response.data.list);
          })
          .catch(() => {
            setLoading1(false);
          });
      }, 1000);
      fetchSubTable();
      if (tableWrapper) {
        setTableHeight(tableWrapper.current.clientHeight);
      }
    } else {
      setClassifyList([]);
      setCombinationList([]);
    }
  }, [structureVisible]);
  const columnsLeft = [{ dataIndex: 'classifyName', title: '分类名称' }];
  // const columnsRight = [{ dataIndex: 'combinationName', title: '组合名称' }];
  const onSave = async () => {
    setConfirmLoading(true);
    const params = {
      id: selectedId,
    };
    setTimeout(() => {
      saveStructure(params)
        .then((response) => {
          MsgBox.success({ message: '保存成功' });
          setConfirmLoading(false);
          setStructureVisible(false);
          handles && handles.query();
        })
        .catch(() => {
          MsgBox.error({ message: '保存失败' });
          setConfirmLoading(false);
        });
    }, 1000);
  };
  const onCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Modal
        title="产品结构配置"
        visible={structureVisible}
        bodyStyle={{ height: '560px', padding: '0px' }}
        width={900}
        onCancel={() => {
          setStructureVisible(false);
        }}
        footer={
          <>
            <Checkbox checked={checked} onChange={onCheck} style={{ float: 'left' }}>
              仅应用于当前功能
            </Checkbox>
            <Button
              type="text"
              onClick={() => {
                setStructureVisible(false);
              }}
            >
              取消
            </Button>
            <Button
              loading={confirmLoading}
              type="primary"
              onClick={() => {
                onSave();
              }}
            >
              确定
            </Button>
          </>
        }
      >
        <SplitPane
          minSize={220}
          split="vertical"
          style={{ position: 'static' }} // 跟高度有关
          paneStyle={{ overflow: 'auto' }} // 左右联动宽度
        >
          <aside className="a-card">
            <div className="a-card-body px-2" ref={tableWrapper}>
              <QuarkTable
                rowClassName={(record) => {
                  const selectedStyle = record.id === selectedId ? styles.rowSelected : '';
                  return `${selectedStyle} ${styles.rowHover}`;
                }}
                loading={loading1}
                columns={columnsLeft}
                dataSource={classifyList}
                rowSelection={false}
                scroll={{ y: tableHeight - 40 }}
                onRow={(record) => {
                  return {
                    // 点击行
                    onClick: (event) => {
                      setSelectedId(record.id);
                      fetchSubTable(record.id);
                    },
                  };
                }}
              />
            </div>
          </aside>
          <section className="a-card">
            <div className="a-card-body px-2">
              <QuarkTable
                loading={loading2}
                columns={columnsRight}
                dataSource={combinationList}
                rowSelection={false}
                scroll={{ y: tableHeight - 40 }}
                expandable={{
                  onExpand,
                  expandedRowKeys: expandedRows,
                  expandIcon: ({ expanded, onExpand, record }) => {
                    if (record.isLeaf) {
                      return <span className="mr-2 invisible" />;
                    }
                    return expanded ? (
                      <CaretDownOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
                    ) : (
                      <CaretRightOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
                    );
                  },
                }}
              />
            </div>
          </section>
        </SplitPane>
      </Modal>
    </>
  );
};
export default ProductStructureModal;
