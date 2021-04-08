import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useImperativeHandle,
} from 'react';
import { Input } from 'antd';
import { DownOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Transfer, Tree, List, Checkbox, Modal } from 'antd';
import BeanUtil from '@/utils/BeanUtil';
import css from '../index.less';

const { Search } = Input;

// 从树结构找节点
const findOne = (key, data) => {
  //console.log(" data 1 "+ JSON.stringify(data));
  for (let i = 0; i < data.length; i++) {
    if (data[i].key == key) {
      return data[i];
    }

    if (data[i].children) {
      const _data = data[i].children;
      if (findOne(key, _data)) {
        return findOne(key, _data);
      }
    }
  }

  return null;
};

const TreeTransfer = ({ dataSource, targetKeys, selectedKeys, setSelectedKeys, ...restProps }) => {
  const _dataSource = BeanUtil.cloneDeep(dataSource);

  // 左侧搜索框值
  const [searchValueLeft, setSearchValueLeft] = useState('');
  // 右侧搜索框值
  const [searchValueRight, setSearchValueRight] = useState('');
  // 展开值
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map((item) => {
      const { children, ...props } = item;
      let disabled = false;
      if(checkedKeys !=null){
        disabled = checkedKeys.includes(props.key);
      }
      return {
        ...props,
        disabled,
        children: generateTree(children, checkedKeys),
      };
    });
  };

  const transferDataSource = [];
  // 扁平化
  function flatten(list = []) {
    if(list !== null){
      list.forEach((item) => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    }
  }
  flatten(dataSource);

  // 渲染经过过滤的数据
  const searchTree = (value, data) => {
    return data.map((item) => {
      let { title, key, icon, children } = item;
      if (typeof item.title === 'string') {
        const index = item.title.indexOf(value);
        if (index > -1) {
          const beforeStr = item.title.substr(0, index);
          //console.log(" value 2 "+ JSON.stringify(value));
          const afterStr = item.title.substr(index + value.length);
          title = (
            <span>
              {beforeStr}
              <span style={{ color: 'red' }}>{value}</span>
              {afterStr}
            </span>
          );
        }
        if (children) {
          return { title, key, icon, children: searchTree(value, children) };
        }
      }

      return {
        title,
        key: item.key,
        icon,
      };
    });
  };

  // 渲染经过过滤的**右侧**数据
  const searchList = (value = '', data = targetKeys) => {
    let ret = [];
    //console.log(" data 3 "+ JSON.stringify(data));
    if(data){
      for (let i = 0; i < data.length; i++) {
        let dataName = findOne(data[i], _dataSource) ? findOne(data[i], _dataSource).title : data[i];
        if (dataName.indexOf(value) > -1) {
          ret.push(data[i]);
        }
      }
    }
    return ret;
  };

  const handleSearch = (dir, value) => {
    if (dir == 'left') {
      setSearchValueLeft(value);
      // 查找父节点
      const findParent = (value, data, ret = []) => {
        //console.log(" data 4 "+ JSON.stringify(data));
        if(data){
          for (let i = 0; i < data.length; i++) {
            if (data[i].title.indexOf(value) > -1) {
              if (data[i].typeP == '[root]') {
                ret.push(data[i].key);
              } else {
                ret.push(data[i].typeP);
              }
            }

            if (!data[i].isLeaf) {
              ret = ret.concat(findParent(value, data[i].children, ret));
            }
          }
        }

        return ret;
      };

      const expandedKeys = Array.from(new Set(findParent(value, _dataSource)));

      setExpandedKeys(expandedKeys);
      setAutoExpandParent(true);
    } else {
      // 右侧
      setSearchValueRight(value);
    }
  };

  // 显示的树形
  let treeData = useMemo(() => {
    return generateTree(searchTree(searchValueLeft, dataSource), targetKeys);
  }, [searchValueLeft, dataSource, targetKeys]);

  let rightData = useMemo(() => {
    return searchList(searchValueRight, targetKeys);
  }, [searchValueRight, dataSource, targetKeys]);

  const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
  };

  return (
    <Transfer
      {...restProps}
      targetKeys={rightData}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={true}
      showSearch
      onSearch={handleSearch}
      style={{ height: '360px' }}
      listStyle={{
        width: 150,
        height: 360,
      }}
    >
      {/* render 函数*/}
      {(params) => {
        const {
          direction,
          onItemSelect,
          onItemSelectAll,
          selectedKeys,
          filteredItems,
          dataSource,
        } = params;
        if (direction === 'left') {
          if (!targetKeys) {
            targetKeys = [];
          }
          let checkedKeys = [...selectedKeys, ...targetKeys];

          return (
            <Tree
              blockNode
              checkable
              // defaultExpandAll
              checkedKeys={selectedKeys}
              treeData={treeData}
              // expandedKeys={[]}
              showIcon={true}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              //
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
                onItemSelectAll(selectedKeys, false);
                onItemSelectAll(_, true);
                // setSelectedKeys(_);
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
                // setSelectedKeys([]);
              }}
            />
          );
        } else {
          // 自定义右侧显示
          let ret = rightData.map((x, i) => {
            let title = findOne(x, _dataSource) ? findOne(x, _dataSource).title : x;
            let checked = selectedKeys.includes(x);
            return (
              <List.Item key={x} style={{ height: 28 }}>
                <Checkbox
                  onChange={(e) => {
                    // //console.log('checkd', e.target.checked);
                    onItemSelect(x, e.target.checked);
                  }}
                  checked={checked}
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={title}
                >
                  <span title={title}>{title}</span>
                </Checkbox>
              </List.Item>
            );
          });
          // 右侧渲染
          return <List style={{ padding: '0 10px' }}>{ret}</List>;
        }
      }}
    </Transfer>
  );
};

const DataTransfer = ({ setSelectedKeys, selectedKeys, targetKeys, setTargetKeys, data }) => {
  // 点击传送
  let _targetKeys = targetKeys || [];
  const onChange = (targetKeys, direction, curTargetKeys) => {
    let cur = [];
    if (direction === 'right') {
      // 左-->右
      //console.log(" _targetKeys  "+ JSON.stringify(_targetKeys));
      let _cur = [];
      if(_targetKeys){
        _cur = _targetKeys.concat(curTargetKeys);
      }
      //console.log(" cur 5 "+ JSON.stringify(cur));
      for (let i = 0; i < _cur.length; i++) {
        if (findOne(_cur[i], data) && findOne(_cur[i], data).isLeaf) {
          cur.push(_cur[i]);
        }
        // 容错：找不到也要展示
        if (!findOne(_cur[i], data)) {
          cur.push(_cur[i]);
        }
      }
      cur = Array.from(new Set(cur));
    } else {
      // 右-->左
      //console.log(" _targetKeys 6 "+ JSON.stringify(_targetKeys));
      for (let i = 0; i < _targetKeys.length; i++) {
        let flag = true;
        //console.log(" _targetKeys 7 "+ JSON.stringify(curTargetKeys));
        for (let j = 0; j < curTargetKeys.length; j++) {
          if (curTargetKeys[j] == _targetKeys[i]) {
            flag = false;
          }
        }
        if (flag) {
          cur.push(_targetKeys[i]);
        }
      }
    }

    setTargetKeys(cur);

    // //console.log('清空选择');
    setSelectedKeys([]);
  };

  return (
    <>
      <TreeTransfer
        dataSource={data}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        onChange={onChange}
      />
    </>
  );
};

const TableTreeDropdown = (props) => {
  let { data, onChange, value } = props;

  const [visible, setVisble] = useState(false);
  const [close, setClose] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // 选中内容
  const [targetKeys, setTargetKeys] = useState(value);

  const [_targetKeys, set_targetKeys] = useState(targetKeys);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const getIndexNameByIndexCode = (indexCodes, data) => {
    let ret = indexCodes.map((x) => {
      if (findOne(x, data)) {
        return findOne(x, data).indexName;
      } else {
        // 容错：树上找不到,用code替换name
        return x;
      }
    });
    // .filter((x) => {
    //   return !!x == true;
    // });

    return ret;
  };

  const getShowData = (indexCodes, data) => {
    // if (typeof indexCodes == 'string') {
    //   indexCodes = indexCodes.split(',');
    // }

    let _showData = getIndexNameByIndexCode(indexCodes, data).join('；');
    return _showData ? _showData : '请选择';
  };

  let showData = getShowData(_targetKeys ? _targetKeys : [], data);

  // 允许外界传值
  useEffect(() => {
    set_targetKeys(value);
    setTargetKeys(value);
    // triggerChange(value);
    showData = getShowData(_targetKeys ? _targetKeys : [], data);
  }, [value]);

  const handleOk = (e) => {
    set_targetKeys(targetKeys);
    // //console.log('ok', targetKeys);
    triggerChange(targetKeys);
    setTimeout(() => {
      triggerChange(targetKeys);
    });

    setVisble(false);
  };

  const handleCancel = () => {
    // //console.log('cancel');
    // 关闭时恢复
    setTargetKeys([]);
    window.setTimeout(() => {
      setTargetKeys(_targetKeys);
      // 此处应让所有选中的取消选中
    });

    // 。。。
    setVisble(false);
  };

  return (
    <div>
      <a
        className="ant-dropdown-link"
        onClick={(e) => {
          e.preventDefault();
          setVisble(true);
        }}
        style={{ display: 'flex', width: '350px' }}
      >
        <div
          title={showData}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          onMouseEnter={() => {
            _targetKeys && _targetKeys.length && setClose(true);
          }}
          onMouseLeave={() => {
            setClose(false);
          }}
        >
          {showData}
        </div>
        <div
          onClick={(e) => {
            if (close) {
              e.preventDefault();
              e.stopPropagation();

              set_targetKeys([]);
              setTargetKeys([]);
              triggerChange([]);
            } else {
            }
          }}
          onMouseEnter={() => {
            _targetKeys && _targetKeys.length && setClose(true);
          }}
          onMouseLeave={() => {
            setClose(false);
          }}
          style={{ display: 'block', marginLeft: 'auto', lineHeight: '24px' }}
        >
          <CloseCircleOutlined style={{ display: close ? 'inline-block' : 'none' }} />
        </div>
      </a>
      <Modal
        width={660}
        height={500}
        wrapClassName={css.chartSetting}
        title="设置指标范围"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        // forceRender={true}
        // getContainer={false}
      >
        <DataTransfer
          data={data}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          targetKeys={targetKeys}
          setTargetKeys={setTargetKeys}
        />
      </Modal>
    </div>
  );
};

export default TableTreeDropdown;
