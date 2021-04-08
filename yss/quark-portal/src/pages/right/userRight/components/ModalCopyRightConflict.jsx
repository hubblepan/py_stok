import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Form, Typography, TreeSelect, Checkbox} from 'antd';
import request from '@/utils/request';
import MsgBox from "@/utils/MsgBox";
import moment from 'moment';
import AppContext from "@/utils/AppContext";
import QuarkTree from '@/pages/right/components/QuarkTree';
import {features, useTablePipeline} from "ali-react-table";

const { Title } = Typography;
const commParams = {serviceId: 'osgi-fast'};

const ModalCopyRight = ({showCopyRight, setShowCopyRight, }) => {
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
  const queryData = async (dataType) => {
    request.post('/YSSUCOBRIDGE/ws/com/yss/right/controller/IFastDataRightServiceController/queryDataByType', {params: commParams, data: dataType})
      .then(res => {
        // 显示 res
        let dataMap = {};
        res.data.forEach(item => {
          dataMap[item.c_DATA_CODE] = item;
        });
        setDataMap(dataMap);
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  const queryUserDataRight = async (postCodes, c_DATA_TYPE, c_USER_CODE) => {
    const res = await request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/queryByUserCodeByUser', {params: commParams, data: {postCodes, c_DATA_TYPE, c_USER_CODE}});
    return res;
  }

  const compareUserRight = async (fromUser, toUser) => {
    const diff = []; // 存在于 toUser 而不存在于 fromUser 的权限数据。
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

  // 判断表单数据是否重复
  const judgeDataRepeat = (data) => {
    return request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/judgeDataRepeat', {
      params: commParams,
      data,
    });
  }

  const insertDatas = (insertModel) => {
    //获取表单数据
    const formValues = form.getFieldsValue();
    request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/insertDatas', {
      params: commParams,
      data: {
        ...formValues,
        dataType:dataType.c_DATA_TYPE,
        insertModel,
      }
    }).then(res => {
      MsgBox.success({message: '新增成功'});
      // setShowCopyRight(false);
      //刷新数据
      subHandles.autoQuery();
    }).catch(reason => {
      MsgBox.error({message: reason});
    });
  };

  const handleJudgeDataRepeat = (res) => {
    //重复
    if (res.data === 'true') {
      MsgBox.confirm({
        title: '数据重复',
        content: '新增数据重复请选择下列操作',
        okText: '覆盖',
        cancelText: '追加',
        //点击覆盖，0代表覆盖
        onOk: () => {
          insertDatas('0');
        },
        //点击追加，1代表追加
        onCancel: () => {
          insertDatas('1');
        }
      });
    }
    //未重复,直接调用追加方法
    else{
      insertDatas('1');
    }
  };

  const handleOk = async () => {
    // 1. 获取源用户
    // originUser
    // 2. 获取原用户的数据权限
    const {data: originUserRights} = await queryUserDataRight(postCodes, dataType, originUser.c_CORP_ORG_CODE);
    // 3. 遍历目标用户
    for (const targetUserCode of selectedKeys) {
      // 4. 获取目标用户的用户权限数据
      const {data: targetUserRights} = await queryUserDataRight(postCodes, dataType, targetUserCode);
      // 5. 从源用户的数据权限中拷贝 已审核的 数据 生成一份列表，并将userCode 替换成目标用户
      const newUserRights = originUserRights.filter(right => right.auditState === 1).map(right => ({...right, C_USER_CODE: targetUserCode, id: ''}));
      // 6. 获取冲突的数据
      const getConflictData = (oldUserRights, newUserRights) => {
        const confictResult = [];
        oldUserRights.forEach(oldRight => {
          newUserRights.forEach(newRight => {
            if (oldRight.c_DATA_CODE === newRight.c_DATA_CODE) {
              const rightData = dataMap[oldRight.c_DATA_CODE];
              if (confictResult.indexOf(rightData)=== -1) {
                confictResult.push(rightData);
              }
            }
          })
        });
        return confictResult;
      };
      const conflictRight = getConflictData(targetUserRights, newUserRights);
      console.log('xxxxxx-冲突的权限', conflictRight);
    }


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
    setShowCopyRight(false);
  };

  const handleCancel = () => {
    setShowCopyRight(false);
  };

  return (
    <Modal title="复制" visible={showCopyRight} onOk={handleOk} onCancel={handleCancel} width="35%">
      <QuarkTree {...pipeline.getProps()} useVirtual style={{width: '100%', height: '300px', overflow: 'auto'}}/>
    </Modal>
  );
};

export default ModalCopyRight
