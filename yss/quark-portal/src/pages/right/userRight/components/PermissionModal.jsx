import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { Modal, Input, Table, Button, Select, Checkbox, Popover, Form, Row, Col } from 'antd';
import MsgBox from '@/utils/MsgBox';
import {
  SearchOutlined,
  EditOutlined,
  CopyOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  FullscreenOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import SplitPane from 'react-split-pane';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal';
import {
  query,
  queryTree,
  saveTree,
  copyTree,
  queryUserData,
  queryUserTreeData,
} from '@/services/permission.js';
import styles from './style.less';

const PermissionModal = (props) => {
  const { permission, setPermission } = props;
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState([]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [userDisabled, setUserDisabled] = useState(true);

  const { Option } = Select;
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);

  const [defaultExpanded, setDefaultExpanded] = useState([]);
  const [random, setRandom] = useState(0);

  const [isChecked, setIsChecked] = useState(false);
  const [check, setCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [isChecked1, setIsChecked1] = useState(false);
  const [check1, setCheck1] = useState(false);

  const [tChecked, setTChecked] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [interCheck, setInterCheck] = useState(false);
  const [tChecked1, setTChecked1] = useState(false);
  const [recordCount1, setRecordCount1] = useState(0);
  const [interCheck1, setInterCheck1] = useState(false);

  const [tChecked3, setTChecked3] = useState(false);
  const [recordCount3, setRecordCount3] = useState(0);
  const [interCheck3, setInterCheck3] = useState(false);

  const [tChecked2, setTChecked2] = useState(false);
  const [recordCount2, setRecordCount2] = useState(0);
  const [interCheck2, setInterCheck2] = useState(false);

  const [tChecked4, setTChecked4] = useState(false);
  const [recordCount4, setRecordCount4] = useState(0);
  const [interCheck4, setInterCheck4] = useState(false);

  const [tChecked5, setTChecked5] = useState(false);
  const [recordCount5, setRecordCount5] = useState(0);
  const [interCheck5, setInterCheck5] = useState(false);

  const { Search } = Input;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    setSelectedRows(selectedRows);
    setSelectedRowKey(selectedRowKey);
  });

  const [data, setData] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userTreeData, setUserTreeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await query();
      setData(res.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await queryUserData();
      setUserData(res.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await queryUserTreeData();
      setUserTreeData(res.data);
    }
    fetchData();
  }, []);

  // 默认展开表格
  const renderTable = (datas) => {
    /**
     * 这里注意：一定要先改defaultExpandedRowKeys，再改dataSource
     * 1.先深度遍历获取所有的key值
     * 2.再设置dataSource
     */
    new Promise((resolve) => {
      const newExpandedKeys = [];
      const expand = (dataTrees) => {
        // 获取到所有可展开的父节点
        dataTrees.map((item) => {
          newExpandedKeys.push(item.id);
          if (item.children) {
            expand(item.children);
          }
        });
        return newExpandedKeys;
      };
      setDefaultExpanded(expand(datas));
      resolve(datas);
    }).then((datas) => {
      setDataTree(datas);
    });
  };

  const queryTreeTable = async () => {
    if (selectedRows.length === 0) {
      MsgBox.warning({ message: '请选择一条主表数据！' });
    } else {
      await queryTree().then((res) => {
        setDataTree(res.data);
        renderTable(res.data);
      });
    }
  };

  /**
   * 算法实现
   * 递归算法
   *得到所有的树节点
   */
  let obj1 = [];
  function Arr(list) {
    if (list) {
      for (let i = 0; i < list.length; i += 1) {
        let obj2 = {};
        obj2.key = list[i].key;
        obj2.userName = list[i].userName;
        obj2.userNumber = list[i].userNumber;
        obj2.checked = list[i].checked;
        obj2.posts = list[i].posts;
        obj2.children = list[i].children;
        obj1.push(obj2);
        if (list[i].children) {
          Arr(list[i].children);
        }
      }
      return obj1;
    }
    return [];
  }
  const array = Arr(dataTree);
  // console.log(array);

  // 1.递归树形表格数据
  function recursion(recurData, i, type) {
    if (recurData) {
      recurData.map((item, index) => {
        item.checked = type;
        item.posts[i].checked = type;
        if (item.children) {
          recursion(item.children, i, type);
        }
      });
    }
  }
  // 2.递归树形表格数据
  function recursionEvery(recurData, type) {
    if (recurData) {
      recurData.map((item, index) => {
        item.checked = type;
        if (item.children) {
          recursionEvery(item.children, type);
        }
      });
    }
  }
  // 3.递归树形表格数据
  function recursionAll(recurData, i, type) {
    if (recurData) {
      recurData.map((item, index) => {
        item.posts[i].checked = type;
        if (item.posts.every((row) => row.checked === type)) {
          item.checked = type;
        }
        recursionAll(item.children, i, type);
      });
    }
  }

  // 4 递归
  function recursionTree(recurData, type) {
    if (recurData) {
      recurData.map((item, index) => {
        item.checked = type;
        item.posts.map((item1, index) => {
          item1.checked = type;
        });
        recursionTree(item.children, type);
      });
    }
  }

  // 列表选择框
  const rowSelection = {
    onChange: (selectedRowKeys, selectRow) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectRow);
      setSelectedRows(selectRow);
      setSelectedRowKey(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
    disabled: userDisabled,
  };

  // 用户维度--表格权限控制
  const userRowSelection = {
    onChange: (selectedUserRowKeys, selectedUserRows) => {
      // console.log(
      //   `selectedUserRowKeys: ${selectedUserRowKeys}`,
      //   'selectedUserRows: ',
      //   selectedUserRows,
      // );
      if (selectedUserRows) {
        selectedUserRows.map((item, index) => {
          item.checked = true;
          item.posts.map((item1, index) => {
            item1.checked = true;
          });
        });
      }
      if (selectedUserRows.length === 0) {
        userData.map((item, index) => {
          item.checked = false;
          item.posts.map((item1, index) => {
            item1.checked = false;
          });
        });
      }
    },
    renderCell: (checked, record) => {
      return (
        <Checkbox
          disabled={userDisabled}
          checked={record.checked}
          onChange={(e) => {
            if (e.target.checked === true) {
              record.checked = true;
              record.posts.map((item, index) => {
                item.checked = true;
              });
              setRandom(Math.random());
            }
            if (e.target.checked === false) {
              record.checked = false;
              record.posts.map((item, index) => {
                item.checked = false;
              });
              setRandom(Math.random());
            }
          }}
        />
      );
    },

    getCheckboxProps: (record) => ({
      disabled: userDisabled,
    }),
  };

  // rowSelection objects indicates the need for row selection
  const rowSelectionRight = {
    onChange: (treeSelectedRowKeys, treeSelectedRows) => {
      // console.log(
      //   `treeSelectedRowKeys: ${treeSelectedRowKeys}`,
      //   'treeSelectedRows: ',
      //   treeSelectedRows,
      // );
      // 如果子级节点全部为false，那么父级也为false
    },
    onSelect: (record, selected, treeSelectedRows) => {
      // console.log(record, selected, treeSelectedRows);
    },

    renderCell: (checked, record) => {
      return (
        <Checkbox
          disabled={isDisabled}
          checked={record.checked}
          onChange={(e) => {
            if (e.target.checked === true) {
              record.checked = true;
              record.posts.map((item, index) => {
                item.checked = true;
              });
              recursionTree(record.children, true);
              setRandom(Math.random());
            }
            if (e.target.checked === false) {
              record.checked = false;
              record.posts.map((item, index) => {
                item.checked = false;
              });
              recursionTree(record.children, false);
              setRandom(Math.random());
            }
          }}
        />
      );
    },

    onSelectAll: (selected, treeSelectedRows, changeRows) => {
      // console.log(selected, treeSelectedRows, changeRows);

      // 横向checkbox全选选择
      changeRows.map((item, index) => {
        item.checked = selected;
        item.posts.map((item1, index) => {
          item1.checked = selected;
        });
      });
    },
    getCheckboxProps: (record) => ({
      disabled: isDisabled,
    }),
  };

  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indexName',
    },
    {
      title: '指标编码',
      dataIndex: 'indexCode',
    },
  ];
  const userTreeColumns = [
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户编码',
      dataIndex: 'userCode',
    },
  ];

  // 指标维度
  useEffect(() => {
    // todo
    if (recordCount === array.length) {
      setTChecked(true);
    }
    if (recordCount === 0) {
      setTChecked(false);
    }

    // todo
    if (recordCount1 === array.length) {
      setTChecked1(true);
    }
    if (recordCount1 === 0) {
      setTChecked1(false);
    }
    // todo
    if (recordCount2 === array.length) {
      setTChecked2(true);
    }
    if (recordCount2 === 0) {
      setTChecked2(false);
    }
    // todo
    if (recordCount3 === array.length) {
      setTChecked3(true);
    }
    if (recordCount3 === 0) {
      setTChecked3(false);
    }
    // todo
    if (recordCount4 === array.length) {
      setTChecked4(true);
    }
    if (recordCount4 === 0) {
      setTChecked4(false);
    }
    // todo
    if (recordCount5 === array.length) {
      setTChecked5(true);
    }
    if (recordCount5 === 0) {
      setTChecked5(false);
    }
  }, [recordCount, recordCount1, recordCount2, recordCount3, recordCount4, recordCount5]);

  // 用户维度
  useEffect(() => {
    // todo
    if (count === userData.length) {
      setIsChecked(false);
      setCheck(true);
    } else {
      setIsChecked(true);
    }
    if (count === 0) {
      setCheck(false);
      setIsChecked(false);
    }

    if (count1 === userData.length) {
      setIsChecked1(false);
      setCheck1(true);
    } else {
      setIsChecked1(true);
    }
    if (count1 === 0) {
      setCheck1(false);
      setIsChecked1(false);
    }
  }, [count, count1]);

  const userColumns = [
    {
      title: '指标名称',
      dataIndex: 'indexName',
      width: 100,
      key: 'indexName',
      fixed: true,
    },
    {
      title: '指标编号',
      key: 'indexNumber',
      dataIndex: 'indexNumber',
      width: 100,
      fixed: true,
    },
    {
      title: (
        <>
          <Checkbox
            disabled={userDisabled}
            checked={check}
            indeterminate={isChecked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setCheck(true);
                setCount(userData.length);
                userData.map((item, index) => {
                  item.checked = true;
                  item.posts[0].checked = true;
                });
                setData(userData);
              }
              if (e.target.checked === false) {
                setCheck(false);
                setCount(0);
                userData.map((item, index) => {
                  item.checked = false;
                  item.posts[0].checked = false;
                  if (item.posts.every((row) => row.checked === false)) {
                    item.checked = false;
                  } else {
                    item.checked = true;
                  }
                });
                setData(userData);
              }
            }}
          >
            岗位1
          </Checkbox>
        </>
      ),
      key: 'post1',
      width: 100,
      dataIndex: 'post1',
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={userDisabled}
            checked={record.posts[0].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setCount(count + 1);
                record.checked = true;
                record.posts[0].checked = e.target.checked;
              }
              if (e.target.checked === false) {
                setCount(count - 1);
                record.checked = false;
                record.posts[0].checked = e.target.checked;
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
              } else {
                record.checked = true;
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={userDisabled}
            indeterminate={isChecked1}
            checked={check1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setCheck1(true);
                setCount1(userData.length);
                userData.map((item, index) => {
                  item.checked = true;
                  item.posts[1].checked = true;
                });
                setData(userData);
              }
              if (e.target.checked === false) {
                setCheck1(false);
                setCount1(0);
                userData.map((item, index) => {
                  item.checked = false;
                  item.posts[1].checked = false;
                  if (item.posts.every((row) => row.checked === false)) {
                    item.checked = false;
                  } else {
                    item.checked = true;
                  }
                });
                setData(userData);
              }
            }}
          >
            岗位2
          </Checkbox>
        </>
      ),
      key: 'post2',
      width: 100,
      dataIndex: 'post2',
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={userDisabled}
            checked={record.posts[1].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setCount1(count1 + 1);
                record.checked = true;
                record.posts[1].checked = e.target.checked;
              }
              if (e.target.checked === false) {
                setCount1(count1 - 1);
                record.checked = false;
                record.posts[1].checked = e.target.checked;
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
              } else {
                record.checked = true;
              }
            }}
          />
        </div>
      ),
    },
  ];

  // 修改
  const modifyHandle = () => {
    setIsDisabled(false);
  };

  const userModifyHandle = () => {
    setUserDisabled(false);
  };

  // 算法实现

  // 递归
  // 1. 结束条件 treeData为空，返回[]
  // 2. 结束条件 treeData不为空 返回[当前元素].concat(transfer(子元素))
  // 需要实现transfer函数, 输入树形结构, 输出结果为一个一维数组:arrayData
  function transfer(treeData) {
    if (!(!treeData.hasOwnProperty('key') || !treeData)) {
      let arr = [];
      let obj = {};
      obj.key = treeData.key;
      obj.children = treeData.children.map((value) => {
        // [1] arr = arr.concat(transfer(value))
        return value.key;
      });
      arr.push(obj);

      // 这段代码可由代码 [1] 替代，替代后父元素在子元素后
      treeData.children.forEach((value) => {
        arr = arr.concat(transfer(value));
      });
      //

      return arr;
    }
    // 初始treeData是否为空树
    return [];
  }

  const arrayData = transfer(dataTree); // arrayData是一个一维数组, 每个item是一个tree的节点
  // console.log(arrayData);

  // 指标维度--右侧从表
  const columnsTree = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      width: 150,
      key: 'userName',
      fixed: 'left',
    },

    {
      title: '用户编号',
      key: 'userNumber',
      dataIndex: 'userNumber',
      width: 80,
      fixed: 'left',
    },

    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked}
            // indeterminate={interCheck}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked(true);
                setRecordCount(array.length);
                recursion(dataTree, 0, true);
                // setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked(false);
                setRecordCount(0);
                recursionAll(dataTree, 0, false);
                // setDataTree(dataTree);
              }
            }}
          >
            岗位1
          </Checkbox>
        </>
      ),
      key: 'post1',
      width: 100,
      dataIndex: 'post1',
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[0].checked}
            onChange={(e) => {
              if (e.target.checked === false) {
                if (record) {
                  if (record.children) {
                    record.children.map((item, index) => {
                      if (item.posts.every((row) => row.checked === false)) {
                        item.checked = false;
                      }
                    });
                  }
                }
              }

              if (e.target.checked === true) {
                setRecordCount(recordCount + 1);
                record.posts[0].checked = e.target.checked;
                recursion(record.children, 0, true);
                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount(recordCount - 1);
                record.posts[0].checked = e.target.checked;
                recursion(record.children, 0, false);
                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked1}
            // indeterminate={interCheck1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked1(true);
                setRecordCount1(array.length);
                recursion(dataTree, 1, true);
                setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked1(false);
                setRecordCount1(0);
                recursionAll(dataTree, 1, false);
                setDataTree(dataTree);
              }
            }}
          >
            岗位2
          </Checkbox>
        </>
      ),
      key: 'post2',
      dataIndex: 'post2',
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[1].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRecordCount1(recordCount1 + 1);
                record.posts[1].checked = e.target.checked;
                recursion(record.children, 1, true);
                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount1(recordCount1 - 1);
                record.posts[1].checked = e.target.checked;
                recursion(record.children, 1, false);
                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked2}
            // indeterminate={interCheck1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked2(true);
                setRecordCount2(array.length);
                recursion(dataTree, 2, true);

                setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked2(false);
                setRecordCount2(0);
                recursionAll(dataTree, 2, false);

                setDataTree(dataTree);
              }
            }}
          >
            岗位3
          </Checkbox>
        </>
      ),
      key: 'post3',
      dataIndex: 'post3',
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[2].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRecordCount2(recordCount2 + 1);
                record.posts[2].checked = e.target.checked;
                recursion(record.children, 2, true);

                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount2(recordCount2 - 1);
                record.posts[2].checked = e.target.checked;
                recursion(record.children, 2, false);

                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked3}
            // indeterminate={interCheck1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked3(true);
                setRecordCount3(array.length);
                recursion(dataTree, 3, true);

                setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked3(false);
                setRecordCount3(0);
                recursionAll(dataTree, 3, false);

                setDataTree(dataTree);
              }
            }}
          >
            岗位4
          </Checkbox>
        </>
      ),
      key: 'post4',
      dataIndex: 'post4',
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[3].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRecordCount3(recordCount3 + 1);
                record.posts[3].checked = e.target.checked;
                recursion(record.children, 3, true);

                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount3(recordCount3 - 1);
                record.posts[3].checked = e.target.checked;
                recursion(record.children, 3, false);

                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked4}
            // indeterminate={interCheck1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked4(true);
                setRecordCount4(array.length);
                recursion(dataTree, 4, true);

                setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked4(false);
                setRecordCount4(0);
                recursionAll(dataTree, 4, false);

                setDataTree(dataTree);
              }
            }}
          >
            岗位5
          </Checkbox>
        </>
      ),
      key: 'post5',
      dataIndex: 'post5',
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[4].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRecordCount4(recordCount4 + 1);
                record.posts[4].checked = e.target.checked;
                recursion(record.children, 4, true);

                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount4(recordCount4 - 1);
                record.posts[4].checked = e.target.checked;
                recursion(record.children, 4, false);

                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            disabled={isDisabled}
            checked={tChecked5}
            // indeterminate={interCheck1}
            onChange={(e) => {
              if (e.target.checked === true) {
                setTChecked5(true);
                setRecordCount5(array.length);
                recursion(dataTree, 5, true);

                setDataTree(dataTree);
              }
              if (e.target.checked === false) {
                setTChecked5(false);
                setRecordCount5(0);
                recursionAll(dataTree, 5, false);

                setDataTree(dataTree);
              }
            }}
          >
            岗位6
          </Checkbox>
        </>
      ),
      key: 'post6',
      dataIndex: 'post6',
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Checkbox
            disabled={isDisabled}
            checked={record.posts[5].checked}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRecordCount5(recordCount5 + 1);
                record.posts[5].checked = e.target.checked;
                recursion(record.children, 5, true);

                setRandom(Math.random());
              }
              if (e.target.checked === false) {
                setRecordCount5(recordCount5 - 1);
                record.posts[5].checked = e.target.checked;
                recursion(record.children, 5, false);

                setRandom(Math.random());
              }
              if (record.posts.every((row) => row.checked === false)) {
                record.checked = false;
                recursionEvery(record.children, false);
              } else {
                record.checked = true;
                recursionEvery(record.children, true);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const [indexHidden, setIndexHidden] = useState('block');
  const [perHidden, setPerHidden] = useState('none');

  // 维度选择框
  function handleChange(value) {
    if (value === 'index') {
      setIndexHidden('block');
      setPerHidden('none');
    }
    if (value === 'permission') {
      setPerHidden('block');
      setIndexHidden('none');
    }
  }

  // 表格获得高度自适应
  const tableWrapper = useRef(null);
  const [tableHeight, setTableHeight] = useState(500);
  const onResize = useCallback(() => {
    // console.log(tableWrapper);
    // setTableHeight(tableWrapper.current.clientHeight);
  }, []);
  useLayoutEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // console.log(tableHeight);

  function TreeData() {
    return (
      <QuarkTable
        bordered
        rowKey="key"
        destroyOnClose
        columns={columnsTree}
        className={styles.tableStyle}
        pagination={false}
        style={{ display: indexHidden }}
        rowSelection={{ ...rowSelectionRight, checkStrictly: false, width: '50', fixed: 'left' }}
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
        dataSource={dataTree}
        scroll={{ x: 1000, y: tableHeight - 60 }}
      />
    );
  }

  const saveHandle = async () => {
    try {
      await saveTree().then((res) => {
        // console.log(res);
      });
      MsgBox.success({ message: '保存成功！' });
      setPermission(false);
      setIndexHidden('block');
      setPerHidden('none');
      return true;
    } catch (error) {
      MsgBox.error({ message: '保存失败，请重试!' });
      return false;
    }
  };

  const copyHandle = async () => {
    try {
      await copyTree().then((res) => {
        // console.log(res);
      });
      MsgBox.success({ message: '复制成功！' });
      setVisible(false);
      form.resetFields();
      return true;
    } catch (error) {
      MsgBox.error({ message: '复制失败，请重试!' });
      return false;
    }
  };

  const searchHandel = (e) => {
    console.log(e);
  };

  const childrenOption = [];
  for (let i = 0; i < data.length; i += 1) {
    childrenOption.push(<Option key={i}>{data[i].indexName}</Option>);
  }

  const userOption = [];
  for (let i = 0; i < data.length; i += 1) {
    userOption.push(<Option key={i}>{data[i].indexName}</Option>);
  }

  const [rowId, setRowId] = useState('');
  const [rowLoading, setRowLoading] = useState(false);
  const [indexUser, setIndexUser] = useState('');

  const setRowClassName = (record) => {
    return record.key === rowId ? styles.clickRowStyle : '';
  };

  return (
    <QuarkModal
      title={
        <div style={{ display: 'flex' }}>
          <h6 className="h6">指标权限配置</h6>
          <Select
            defaultValue="index"
            size="small"
            style={{ paddingLeft: '10px' }}
            onChange={handleChange}
          >
            <Option value="index">指标维度</Option>
            <Option value="permission">用户维度</Option>
          </Select>
        </div>
      }
      visible={permission}
      onOk={() => {}}
      destroyOnClose
      getTableHeight={(childData) => {
        setTableHeight(childData);
      }}
      onCancel={() => {
        setPermission(false);
      }}
      // bodyStyle={{ padding: 0, height: '500px', overflowY: 'auto' }}
      // closeIcon={
      //   <div
      //     onClick={(e) => {
      //       e.preventDefault();
      //       return false;
      //     }}
      //   >
      //     <a
      //       href="#"
      //       onClick={(e) => {
      //         e.preventDefault();
      //         // 最大化
      //       }}
      //     >
      //       <FullscreenOutlined />
      //     </a>
      //     &nbsp;&nbsp;
      //     <a
      //       href="#"
      //       onClick={(e) => {
      //         e.preventDefault();
      //         setPermission(false);
      //         setIndexHidden('block');
      //         setPerHidden('none');
      //       }}
      //     >
      //       <CloseOutlined />
      //     </a>
      //   </div>
      // }
      footerType="save"
      // footer={
      //   <>
      //     <Button
      //       key="back"
      //       type="text"
      //       onClick={() => {
      //         setIndexHidden('block');
      //         setPerHidden('none');
      //         setPermission(false);
      //       }}
      //     >
      //       取消
      //     </Button>
      //     <Button key="submit" type="primary" onClick={saveHandle}>
      //       保存
      //     </Button>
      //   </>
      // }
    >
      <SplitPane
        split="vertical"
        defaultSize="30%"
        minSize={200}
        maxSize={300}
        paneStyle={{ overflow: 'auto' }}
        style={{ position: 'unset' }}
      >
        <aside className="a-card">
          <div className="a-card-header px-2">
            <Input
              placeholder="请输入关键词搜索"
              prefix={<SearchOutlined />}
              onClick={searchHandel}
              onPressEnter={(e) => {
                setLoading(true);
                setTimeout(() => {
                  // 根据输入框的值调接口查询表格数据
                  query()
                    .then((res) => {
                      setLoading(false);
                      MsgBox.success({ message: '搜索完毕！' });
                    })
                    .catch(() => {
                      setLoading(false);
                      MsgBox.success({ message: '搜索失败！' });
                    });
                }, 1000);
              }}
            />
          </div>
          <div className="a-card-body px-2">
            <QuarkTable
              bordered
              rowKey="key"
              destroyOnClose
              className={styles.tableStyle}
              rowSelection={rowSelection}
              columns={columns}
              pagination={false}
              dataSource={data}
              style={{ display: indexHidden }}
              loading={loading}
              scroll={{ y: tableHeight - 60 }}
            />
            <QuarkTable
              bordered
              rowKey="key"
              destroyOnClose
              rowSelection={false}
              className={styles.tableStyle}
              columns={userTreeColumns}
              pagination={false}
              dataSource={userTreeData}
              style={{ display: perHidden }}
              loading={loading}
              scroll={{ y: tableHeight - 60 }}
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    setIndexUser(record);
                    setRowId(record.key);
                    setRowLoading(true);
                    setTimeout(() => {
                      // 根据选中行数据调接口查询表格数据
                      queryUserData({ params: '' })
                        .then((res) => {
                          setRowLoading(false);
                        })
                        .catch(() => {
                          setRowLoading(false);
                        });
                    }, 1000);
                  }, // 点击行
                };
              }}
              rowClassName={setRowClassName}
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
            />
          </div>
        </aside>
        <section className="a-card">
          <div className="a-card-header" style={{ justifyContent: 'flex-end' }}>
            <nav className="a-card-toolbar" style={{ display: indexHidden }}>
              <Button
                type="text"
                icon={<SearchOutlined />}
                disabled={selectedRows.length === 0}
                onClick={async () => {
                  await queryTreeTable();
                }}
              >
                查询
              </Button>
              <Button type="text" icon={<EditOutlined />} onClick={modifyHandle}>
                修改
              </Button>
              <Popover
                content={
                  <div style={{ width: '600px' }}>
                    <Form
                      name="basic"
                      form={form}
                      className={styles.formStyle}
                      initialValues={selectedRows[0]}
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item {...layout} label="将指标" name="indexName">
                            <Select onChange={handleChange} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item {...layout} label="权限复制至" name="permissionCopy">
                            <Select mode="tags" placeholder="请选择..." onChange={handleChange}>
                              {childrenOption}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="text"
                        onClick={() => {
                          setVisible(false);
                          form.resetFields();
                        }}
                      >
                        取消
                      </Button>
                      <Button type="primary" onClick={copyHandle}>
                        确定
                      </Button>
                    </div>
                  </div>
                }
                title={<h4 className="h6">权限复制</h4>}
                trigger="click"
                placement="bottomRight"
                visible={visible}
                onVisibleChange={(visible1) => {
                  form.resetFields();
                  setVisible(visible1);
                }}
              >
                <Button type="text" icon={<CopyOutlined />} disabled={selectedRows.length !== 1}>
                  复制
                </Button>
              </Popover>
            </nav>
            <nav className="a-card-toolbar" style={{ display: perHidden }}>
              <Button type="text" icon={<EditOutlined />} onClick={userModifyHandle}>
                修改
              </Button>
              <Popover
                content={
                  <div style={{ width: '600px' }}>
                    <Form
                      name="basic1"
                      form={form}
                      className={styles.formStyle}
                      initialValues={indexUser}
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item {...layout} label="将指标" name="userName">
                            <Select />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item {...layout} label="权限复制至" name="permissionUserCopy">
                            <Select mode="tags" placeholder="请选择...">
                              {userOption}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="text"
                        onClick={() => {
                          setUserVisible(false);
                          form.resetFields();
                        }}
                      >
                        取消
                      </Button>
                      <Button type="primary" onClick={copyHandle}>
                        确定
                      </Button>
                    </div>
                  </div>
                }
                title={<h4 className="h6">权限复制</h4>}
                trigger="click"
                placement="bottomRight"
                visible={userVisible}
                onVisibleChange={(v) => {
                  form.resetFields();
                  setUserVisible(v);
                }}
              >
                <Button type="text" icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popover>
            </nav>
          </div>
          <div className="a-card-body px-2">
            <TreeData />
            <QuarkTable
              rowKey="key"
              destroyOnClose
              resizable={false}
              columns={userColumns}
              rowSelection={userRowSelection}
              pagination={false}
              dataSource={userData}
              style={{ display: perHidden }}
              scroll={{ x: 'max-content', y: tableHeight - 60 }}
              loading={rowLoading}
            />
          </div>
        </section>
      </SplitPane>
    </QuarkModal>
  );
};

export default PermissionModal;
