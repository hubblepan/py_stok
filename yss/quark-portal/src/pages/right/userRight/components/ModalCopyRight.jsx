import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Form, Typography, TreeSelect, Checkbox, Button} from 'antd';
import request from '@/utils/request';
import MsgBox from "@/utils/MsgBox";
import moment from 'moment';
import AppContext from "@/utils/AppContext";
import QuarkTree from '@/pages/right/components/QuarkTree';
import {features, useTablePipeline} from "ali-react-table";
import user from "../../../../../mock/user";
import {updateUserPostDataCopy, auditUserPostByPostList, queryUserDataRight, queryDataByType} from '../service/UserRightService';

const { Title } = Typography;
const commParams = {serviceId: 'osgi-fast'};

const ModalCopyRight = ({showCopyRight, setShowCopyRight, orgUserTree, orgUserMap, originUser, postList, curDataType}) => {
  const postCodes = postList.map(item => item.c_POST_CODE);
  const dataType = curDataType.c_DATA_TYPE;
  const rootKey = '[rootKey]';
  const [dataMap, setDataMap]  = useState({});
  const columns = [
    { code: 'c_CORP_ORG_NAME', name: '用户列表', width: 150},
    { code: 'c_CORP_ORG_CODE', name: '用户编号', width: 150},
  ];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const pipeline = useTablePipeline({ components: {Checkbox} });
  pipeline.input({ dataSource: orgUserTree, columns})
    .primaryKey('c_CORP_ORG_CODE')
    // .use(features.treeMode())
  pipeline.use(features.treeMode({}))
    .use(
      features.treeSelect({
        tree: orgUserTree,
        rootKey,
        checkboxPlacement: 'start',
        checkedStrategy: 'all',
        clickArea: 'cell',
        // defaultValue: ['1', '3'],
        checkboxColumn: { lock: true },
        highlightRowWhenSelected: true,
        value: selectedKeys,
        onChange: setSelectedKeys,
      }),
    );

  const [conflict, setConflict] = useState({show: false, conflictData: [], oldData: [], newData: [], userCode: ''});
  const showConflict = (conflictData, oldData, newData, userCode) => {
    setConflict({show: true, conflictData, oldData, newData, userCode});
  };
  const hideConflict = () => {
    setConflict({show: false, conflictData: [], oldData: [], newData: [], userCode: ''});
  }

  const queryData = async () => {
    queryDataByType(dataType)
      .then(res => {
        // 显示 res
        const dataMap = {};
        res.data.forEach(item => {
          dataMap[item.c_DATA_CODE] = item;
        });
        setDataMap(dataMap);
      })
      .catch(reason => {
        console.log(reason);
      })
  }


  // type add cover
  const getUserPostDatas = (userPostDatas, oldUserPostDatas, type, conflictRights, isUnAudit) => {
    const newUserPostDatas = [];
    if (type === "add") {
      newUserPostDatas.concat(oldUserPostDatas);
      userPostDatas.forEach(newUserPostData => {
          let has = false;
          for (const oldUserPostData of oldUserPostDatas) {
            if (newUserPostData.c_DATA_CODE === oldUserPostData.c_DATA_CODE && newUserPostData.c_USER_CODE === oldUserPostData.c_USER_CODE && newUserPostData.c_POST_CODE === oldUserPostData.c_POST_CODE) {
              has = true;
              break;
            }
            else if (newUserPostData.c_DATA_CODE === oldUserPostData.c_DATA_CODE && newUserPostData.c_USER_CODE === oldUserPostData.c_USER_CODE && !newUserPostData.c_POST_CODE === oldUserPostData.c_POST_CODE) {
              if (isUnAudit) {
                oldUserPostData.auditState = 0;
              } else {
                oldUserPostData.auditState = 1;
              }
            }
          }
          if (!has) {
            if (isUnAudit) {
              newUserPostData.auditState = 0;
            } else {
              newUserPostData.auditState = 1;
            }
            newUserPostDatas.push(newUserPostData);
          }
        });
      return newUserPostDatas;
    }

    if (type === "cover") {
      const conflictUserCodes = conflictRights.map(item => item.c_DATA_CODE);
      const extraPostDatas = oldUserPostDatas.filter(item => conflictUserCodes.indexOf(item.c_DATA_CODE) === -1);
      newUserPostDatas.concat(extraPostDatas);
      userPostDatas.forEach(upd => {
        if (isUnAudit) {
          upd.auditState = 0;
        } else {
          upd.auditState = 1;
        }
      });
      return newUserPostDatas;
    }
      return newUserPostDatas;
  }


  // const userList = [];
  // const getUserList = (treeList) => {
  //   treeList.forEach(item => {
  //     if (item.c_DATA_TYPE === 'USER') {
  //       userList.push({...item, title: item.c_CORP_ORG_NAME, value: item.c_CORP_ORG_CODE});
  //     } else if (item.children) {
  //       getUserList(item.children);
  //     }
  //   })
  // };
  // getUserList(orgUserTree);

  // const postOptions = postList.map(item => {
  //   return {...item, title: item.c_POST_NAME, value: item.c_POST_CODE}
  // });


  // 当对话框显示时： 清除
  useEffect(() => {
    if (showCopyRight) {
      setSelectedKeys([]);
      queryData(dataType);
    }
  }, [showCopyRight]);

  const getConflictData = (oldUserRights, newUserRights) => {
    const conflictResult = [];
    oldUserRights.forEach(oldRight => {
      newUserRights.forEach(newRight => {
        if (oldRight.c_DATA_CODE === newRight.c_DATA_CODE) {
          const rightData = dataMap[oldRight.c_DATA_CODE];
          if (conflictResult.indexOf(rightData)=== -1) {
            conflictResult.push(rightData);
          }
        }
      })
    });
    return conflictResult;
  };

  const [copyUserCodeList, setCopyUserCodeList] = useState([]);
  // 采用方法迭代的方式来搞
  const requestCopy= (userRights, userCode) => {
    updateUserPostDataCopy(userRights, postCodes, dataType, userCode)
      .then(res => {
        // TODO 这里要做审核逻辑
        // userRights.forEach(item => {
        //
        // });
        // return auditUserPostByPostList(userRights);
        return new Promise((resolve) => {resolve()});
      })
      .then(res => {
        if (!res) {
          // 代表不需要审核
        } else {
          // 代表是从审核接口返回的
        }

        // 处理请求完成后的后续动作
        hideConflict();
        if (copyUserCodeList.length <= 1) {
          // 最后一个， 关闭所有对话框
          setShowCopyRight(false);
        } else {
          copyUserCodeList.shift();
          setCopyUserCodeList([...copyUserCodeList]); // 处理第二个用户数据

        }
      })
      .catch(reason => {
        console.log(reason);
        hideConflict();
      });
  };

  const copyUser = () => {
    const targetUserCode = copyUserCodeList[0]; // 获取第一个用户
    let originUserRights = [];
    let oldUserRights = [];
    let newUserRights = [];
    // 4. 获取目标用户的用户权限数据
    queryUserDataRight(postCodes, dataType, originUser.c_CORP_ORG_CODE)
      .then(res => {
        originUserRights = res.data;
        return queryUserDataRight(postCodes, dataType, targetUserCode);
      })
      .then(res => {
        oldUserRights = res.data;
        // 5. 从源用户的数据权限中拷贝 已审核的 数据 生成一份列表，并将userCode 替换成目标用户
        newUserRights = originUserRights.filter(right => right.auditState === 1).map(right => ({...right, C_USER_CODE: targetUserCode, id: ''}));
        // 6. 获取冲突的数据
        const conflictRight = getConflictData(oldUserRights, newUserRights);
        if (conflictRight.length === 0) {
          requestCopy(newUserRights, targetUserCode);
        } else {
          showConflict(conflictRight, oldUserRights, newUserRights, targetUserCode);
        }

      })
      .catch(reason => {
        console.log(reason);
      });
  }
  useEffect(() => {
    if (copyUserCodeList.length > 0) {
      copyUser();
    }
  }, [copyUserCodeList]);
  const handleOk = () => {
    const userCodeList = [...selectedKeys];
    setCopyUserCodeList(userCodeList);
    // 对表单的值进行校验
    // form.validateFields()
    //   .then(values => {
    //     console.log('xxxxxxxxxx', values);
    //     return judgeDataRepeat({...values,dataType:dataType.c_DATA_TYPE})
    //   })
    //   .then(res => {
    //     // console.log("res",res)
    //     handleJudgeDataRepeat(res);
    //   })
    //   .catch(errorInfo => {
    //     console.log(errorInfo);
    //   });
    // setShowCopyRight(false);
  };

  const handleCancel = () => {
    setShowCopyRight(false);
  };

  const conflictColumns = [
    {code: 'c_DATA_NAME', name: '名称'},
    {code: 'c_DATA_CODE', name: '代码'}
  ]

  const handleConflictAppend = (conflictData, oldData, newData, userCode) => {
    // 处理追加数据， 如果默认审核， ， 则执行审核
    const userPostDatas = getUserPostDatas(newData, oldData, 'add', conflictData, false);
    requestCopy(userPostDatas, userCode);
  }

  const handleConflictCover = (conflictData, oldData, newData, userCode) => {
    const userPostDatas = getUserPostDatas(newData, oldData, 'cover', conflictData, false);
    requestCopy(userPostDatas, userCode);
  }

  const handleConflictCancel = () => {

  }

  return (
    <Modal title="复制" visible={showCopyRight} onOk={handleOk} onCancel={handleCancel} width="35%">
      <QuarkTree {...pipeline.getProps()} useVirtual style={{width: '100%', height: '300px', overflow: 'auto'}}/>

      <Modal title="温馨提示" visible={conflict.show} mask={false} width="25%"
             footer={[
               <Button key="cancel" onClick={handleConflictCancel}>
                 取消
               </Button>,
               <Button key="append" type="primary" onClick={(event) => {handleConflictAppend(conflict.conflictData, conflict.oldData, conflict.newData, conflict.userCode)}}>
                 追加
               </Button>,
               <Button key="cover" type="primary" onClick={(event) => {handleConflictCover(conflict.conflictData, conflict.oldData, conflict.newData, conflict.userCode)}}>
                 覆盖
               </Button>,

             ]}>
        <p>用户[ {conflict.userCode} ], 以下数据已经赋权</p>
        <QuarkTree columns={conflictColumns} dataSource={conflict.conflictData} style={{width: '100%', height: '150px', overflow: 'auto'}}/>
      </Modal>
    </Modal>
  );
};

export default ModalCopyRight
