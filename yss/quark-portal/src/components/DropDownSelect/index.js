import { Table, Dropdown, Input, Card, Checkbox, Tooltip, Select, Button } from 'antd';
import style from './style.less'
import { InfoCircleTwoTone, DownOutlined, SearchOutlined, CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, useImperativeHandle } from 'react';
import QuarkTable from '@/components/QuarkTable'


const utils = {
  /** 前端相关搜索方法 */
  searchMethod ({ dataSource, rowKey, searchWord, searchName }) {
    if (searchWord == '') {
      return this.getTreeKey(dataSource, rowKey);
    }

    const selectNode = [];
    const search = (nodes, parentSate) => {
      if (!nodes) {
        return;
      }
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodeState = {};
        node._isShow = false;
        if (node[searchName].indexOf(searchWord) !== -1) {
          parentSate.extend = true;
          node._isShow = true;
          selectNode.push(node[rowKey]);
        } else if (node.children) {
          search(node.children, nodeState);
        }
        if (nodeState.extend) {
          parentSate.extend = true;
        }
        if (nodeState.extend) {
          selectNode.push(node[rowKey]);
          node._isShow = true;
        }
      }
    };

    search(dataSource, {});
    return selectNode;
  },

  // 获取树全部主键
  getTreeKey (tree, key) {
    const ret = [];
    const _getTree = (_tree) => {
      for (let i = 0; i < _tree.length; i++) {
        _tree[i]._isShow = true;
        ret.push(_tree[i][key]);
        if (_tree[i].children) {
          _getTree(_tree[i].children);
        }
      }
    };
    _getTree(tree);
    return ret;
  },


  // 防抖
  debounce (fn, interval) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      fn();
    }, interval);
  }

}

const DMenu = (props) => {
  const { data, columns, setName, onChange, isTopSelect, rowKey = 'id', title, name, childRef, search, footer, maxHeight, values } = props;


  const CardWidth = 300;

  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState(values);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useImperativeHandle(childRef, () => ({
    clearSelects: () => {
      setKeyword('');
      setSelected([]);
    },
    setSelected,
  }));


  // 前端搜索方法
  const dataFilter = (keyword) => {
    utils.searchMethod({
      dataSource: data, rowKey, searchWord: keyword, searchName: name
    });
    return data;
  }

  // 获取所有key
  const getAllKeys = () => utils.getTreeKey(data, rowKey);
  // 获取所有name
  const getAllNames = () => utils.getTreeKey(data, name);


  // 通过children是否有扩展
  const isExpandale = () => {
    let ret = false;
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i].children)) {
        ret = true;
        break;
      }
    }
    return ret
  }

  // 全选按钮状态
  const isInterminate = () => !!selected.length && selected.length < getAllKeys().length;
  const isSelectAll = () => !!selected.length && (selected.length === getAllKeys().length);

  // 全选
  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      setSelected(getAllKeys());
      setName(
        getAllNames().join(),
      );
    } else {
      setSelected([]);
      setName('');
    }
  };

  useEffect(() => {
    utils.debounce(() => {
      setExpandedRowKeys(utils.searchMethod({
        dataSource: data, rowKey, searchWord: keyword, searchName: name
      }));
    }, 300);
  }, [keyword]);



  useEffect(() => {
    const selectedRows = [];
    dataFilter(keyword).forEach(row => {
      selected.forEach(x => {
        if (x === row[rowKey]) {
          selectedRows.push(row[name])
        }
      })
    })
    if (!isTopSelect) {
      setName(selectedRows.join(','));
    }
  }, [selected])

  // // 数据源切换时清空表格
  // useEffect(() => {
  //   setKeyword('');
  //   setSelected([]);
  //   console.log('是不是变了')
  // }, [dataFilter(keyword)])


  return (
    <Card
      headStyle={{
        padding: '0'
      }}
      bodyStyle={{ padding: 0, margin: 0, maxHeight: maxHeight ? maxHeight : 500, overflowY: 'auto' }}
      title={title}
      style={{ width: CardWidth + 'px' }}
    >

      {/* 搜索框 */}
      <div style={{ height: maxHeight ? maxHeight : '300px', overflowY: 'auto' }}>
        {search ? <div style={{ padding: '10px 10px 0' }}>
          <Input
            onChange={(e) => {
              setKeyword(e.currentTarget.value);
              // 清理checkBox
            }}
            placeholder="请输入关键词搜索"
            prefix={<SearchOutlined />}
          />
        </div> : null}

        <div style={{ paddingTop: search ? '10px' : 0 }}>
          <QuarkTable
            rowClassName={(record, index) => {
              return !record._isShow ? style.hide : ''
            }}
            scroll={{ x: 'max-content', y: maxHeight ? maxHeight - 2 : 208 }}
            rowSelection={{
              columnWidth: 50,
              selectedRowKeys: selected,
              onChange: (selectedRowKeys, selectedRows) => {
                // 当存在顶部下拉框时。此处的setName应该不在表格显示！
                if (!isTopSelect) {
                  setName(selectedRows.map((row) => row[name]).join(','));
                }
                if (typeof onChange === 'function') {
                  onChange(selectedRowKeys, selectedRows)
                }

                window.setTimeout(() => {
                  setSelected(selectedRowKeys);
                })
              },
            }}
            expandable={isExpandale() ? ({
              defaultExpandAllRows: true,
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
              expandedRowKeys,
              onExpand: (expanded, record) => {
                let expandedRows = [];
                if (expanded) {
                  expandedRows = expandedRowKeys.slice(0, expandedRowKeys.length);
                  expandedRows.push(record[rowKey]);
                  setExpandedRowKeys(expandedRows);
                } else {
                  expandedRows = expandedRowKeys.filter((item) => {
                    return item !== record[rowKey];
                  });
                  setExpandedRowKeys(expandedRows);
                }
              },
            }) : false}
            rowKey={rowKey}
            tableLayout="fixed"
            size="small"
            showHeader={false}
            columns={columns}
            dataSource={dataFilter(keyword)}
            pagination={false}
          />
        </div>

      </div>
      {footer ? <div className={style['dropDownSelect-footer']}>
        <div style={{ display: 'flex', margin: 'auto 8px' }}>
          <Checkbox onChange={onCheckAllChange} indeterminate={isInterminate()} checked={isSelectAll()} />
          &nbsp;
          <div>&nbsp;&nbsp;已选 {selected.length} 项</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button size="small" type="text">取消</Button>
          <Button size="small" type="primary">确定</Button >
        </div>
      </div> : null}
    </Card>
  );
};

export default (props) => {
  const { value, data = [], columns = [], onChange, globalSelects, rowKey, renderContent, selected, onVisibleChange, bordered, search, footer, maxHeight } = props;
  const [name, setName] = useState(value);
  const [mode, setMode] = useState(globalSelects?.selected);


  // 接受全局修改
  useEffect(() => {
    if (globalSelects) {
      const key = globalSelects?.selected;
      setMode(key)
      let name = []
      globalSelects.data.forEach((row) => {
        if (row.key === key) {
          name.push(row.name);
        }
      })
      setName(name.join(','));
    }
  }, [globalSelects?.selected])

  // 默认选中第一个
  // useEffect(() => {
  //   setMode(globalSelects?.data[0]?.key)
  // }, [globalSelects?.data?.length])
  const childRef = useRef()
  const _name = props.name ? props.name : 'name';

  //  接受默认值
  useEffect(() => {
    const values = typeof value === 'string' ? value.split(',') : (value?.selectedValues ? value.selectedValues : [])
    const selectedRows = [];
    data.forEach(row => {
      values.forEach(x => {
        if (x === row[rowKey]) {
          selectedRows.push(row[_name])
        }
      })
    })
    setName(selectedRows.join(','));
    if (!!childRef.current) {
      childRef.current.setSelected(values)
    }
  }, [value])


  return (
    <div style={{
      border: bordered ? '1px solid #d5d5d5' : 'none'
    }} className={renderContent ? '' : style.dropDownSelect}>
      <Dropdown
        // trigger={['click']}
        overlay={
          <DMenu
            childRef={childRef}
            title={
              (globalSelects ? (<div style={{ display: 'flex' }}>
                <Select
                  onChange={(key) => {
                    // setMode(value)
                    globalSelects.onChange(setMode, key)
                    childRef.current.clearSelects()

                    let name = []
                    globalSelects.data.forEach((row) => {
                      if (row.key === key) {
                        name.push(row.name);
                      }
                    })
                    setName(name.join(','));
                  }}
                  value={mode}
                  placeholder='请选择' bordered={false} size="large" style={{ width: 200 }}>
                  {
                    globalSelects.data.map(x => {
                      return <Select.Option key={x.key} value={x.key}>{x.name}</Select.Option>
                    })
                  }
                </Select>
              </div>) : null)
            }
            isTopSelect={!!globalSelects}
            setName={setName}
            name={_name}
            data={data}
            columns={columns}
            onChange={onChange}
            rowKey={rowKey}
            search={search === undefined ? true : !!search}
            footer={footer}
            maxHeight={maxHeight}
            values={typeof value === 'string' ? value.split(',') : (value?.selectedValues ? value.selectedValues : [])}
          />
        }
        onVisibleChange={onVisibleChange}
      >
        {renderContent ?
          <Button type="link" icon={renderContent.icon} onClick={e => e.preventDefault()}>{renderContent.text}</Button>
          :
          (<a
            style={{ display: 'flex', width: '100%', padding: '8px' }}
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            {name ? (
              <div
                className="text-center"
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Tooltip placement="topLeft" title={name}>
                  {name}
                </Tooltip>
              </div>
            ) : (
                <span
                  className="text-center"
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#888',
                  }}
                >
                  请选择
                </span>
              )}
            <div style={{ marginLeft: 'auto' }}>
              <small>
                <DownOutlined />
              </small>
            </div>
          </a>)}
      </Dropdown>
    </div >
  );
};
