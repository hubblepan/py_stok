import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import {
  FileSearchOutlined, LockOutlined, SettingOutlined,
} from '@ant-design/icons';
import MsgBox from "@/utils/MsgBox";
import {Tooltip} from "antd";
import React from "react";

const commParams = {serviceId: 'osgi-fast'};
let newInstance = null;

export default class SubTableHandle extends BaseHandle {
  constructor(props) {
    const service = new BaseService({ base: '/YSSUCOBRIDGE' });
    super({ ...props, service});
    newInstance = this;
    const { selectedRows, selectedRowKeys } = props;
    this.selectedRows = selectedRows;
    this.selectedRowKeys = selectedRowKeys;
  }

  async query(options = {}) {
    // 获取选择到的用户数据参数
    const selectedOrgs = this.masterSelectedRows;

    const getParaMap = () => {
      let paraMap = {};
      if (!selectedOrgs || selectedOrgs.length < 1) {
        paraMap = {dataClass: 'User'};
      } else {
        const org = selectedOrgs[0];
        if (org.c_ORG_TYPE === '1') {
          paraMap = {
            C_AUTH_ORG_CODE: org.c_AUTH_ORG_CODE,
            dataClass: 'User'
          };
        } else {
          paraMap = {
            C_CORP_ORG_CODE: org.c_CORP_ORG_CODE,
            C_CORP_ORG_CODE_P: org.c_CORP_ORG_CODE_P,
            dataClass: 'User'
          };
        }
      }
      // 查询参数
      const searchParams = this.searchForm?.getFieldsValue();
      if (searchParams) {
        Object.keys(searchParams).forEach(item => {
          if (searchParams[item]) {
            paraMap[item] = searchParams[item];
          }
        });
      }
      return paraMap;
    };

    this.setLoading(true);
    // 获取总数量
    const queryDataTotal = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryDataTotal';
    const totalRes = await request.post(queryDataTotal, {
      params: commParams,
      data: getParaMap(),
    });


    // 获取分页数据
    let {pageInfo} = options;
    if (!pageInfo) {
      pageInfo = {
        pageNo: 1,
        pageSize: this.pageInfo.pageSize,
        pageTotal: 0,
      }
    }
    pageInfo.pageTotal = totalRes.data;
    const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryByCondition/page';
    const data = {
      paraMap: getParaMap(),
      // 查询数据
      page: {
        currPage: pageInfo.pageNo,
        pageCount: pageInfo.pageNo,
        totalNum: pageInfo.pageTotal,
        pageSize: pageInfo.pageSize,
        usePage: true,
      },
    };

    const res = await request.post(url, {params: commParams, data});
    // dataList 数据放入dataSource
    // headKeyList 数据放入columns
    const newColumns = res?.data?.headKeyList?.map((item, cIndex) => {
      // "key":"C_DV_CARD_TYPE",
      //   "text":"证件类型",
      //   "align":"L",
      //   "format":"",
      //   "realTableName":"",
      //   "aliasColumnName":"",
      //   "serviceId":"IVocDataService",
      //   "showName":"",
      //   "isShow":"",
      //   "width":"",
      //   "sortable":"",
      //   "order":"",
      //   "isExport":"",
      //   "isFrozen":"",
      //   "typeCode":"",
      //   "defaultDictTypeValue":"",
      //   "dictType":""
      return {
        title: item.text,
        dataIndex: item.key[0].toLowerCase() + item.key.substr(1),
        key: item.key,
        width: 100,
        resizable: true,
        hidden: false,
        ellipsis: true,
        export: true,
        render: (text, record) => {
          const convertMap = {...res?.data?.showConvertAssemble?.IVocDataService, ...res?.data?.showConvertAssemble?.ICorpDataService};
          // eslint-disable-next-line no-param-reassign
          text = convertMap[text] ? convertMap[text] : text;
          if (record.c_DV_STATE === 'DISB') {
            return (<span style={{color: '#FAAD15'}}>{text}</span>)
          }
          if (record.c_DV_STATE === 'LOCK' && cIndex === 0) {
            return (<><span style={{color: 'rgba(0, 0, 0, 0.85)'}}>{text}</span> <LockOutlined style={{color: '#FF4D4F'}}/></>)
          }
          return (<span style={{color: 'rgba(0, 0, 0, 0.85)'}}>{text}</span>)

        },
      }
    });
    const {setTabKey} = newInstance;
    newColumns.push({
      title: (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setTabKey('2');
          }}
        >
          <SettingOutlined />
        </a>
      ),
      key: 'sets',
      width: 50,
      dataIndex: 'sets',
      fixed: 'right',
      resizable: false,
      render: (text, record, index) => {
        return (

          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <Tooltip title="权限配置">
              <a
                href="#"
                onClick={(e) => {
                  this.setTabKey("2");
                }}
              >
                <FileSearchOutlined />
              </a>
            </Tooltip>
          </div>
        );
      },
    },);
    this.changeResult({dataSource: res?.data?.dataList, subColumns: newColumns, pageInfo});
  }

  add ({event, button}) {
    console.log(event, button);
    this.changeState({showAddUser: true, modalAddUserMode: 'add'});
  }

  edit () {
    if (this.checkEditUser()) {
      this.changeState({showAddUser: true, modalAddUserMode: 'edit'});
    }
  }

  copy () {
    if (this.checkEditUser()) {
      this.changeState({showAddUser: true, modalAddUserMode: 'copy'});
    }
  }

  unLock() {
    const selectedUsers = this.checkLockUser();
    if (selectedUsers) {
      MsgBox.confirm({
        title: '提示',
        content: '确定为该用户进行启用操作, 该用户可以重新在系统中进行相关操作',
        okText: '是',
        cancelText: '否',
        onOk: () => {
          const userList = selectedUsers.map(item => ({...item, c_DV_STATE: 'ENAB'}));
          this.insertUserLogsForUnLock(selectedUsers.map(item => item.c_USER_CODE))
            .then(() => {
              this.updateUserList(userList);
            });
        },
        onCancel() {
        }
      });
    }
  }

 start() {
    const selectedUsers = this.checkEnableUser();
    if (selectedUsers) {
      this.updateUserList(selectedUsers.map(item => ({...item, c_DV_STATE: 'ENAB'})));
    }
  }

  stop() {
    const selectedUsers = this.checkEnableUser();
    if (selectedUsers) {
      this.updateUserList(selectedUsers.map(item => ({...item, c_DV_STATE: 'DISB'})));
    }
  }

  insertUserLogsForUnLock(userIds) {
    const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/insertUserLogsForUnLock';
    return request.post(url, {
      params: commParams,
      data: userIds,
    });
  }

  updateUserList(userList) {
    this.setLoading(true);
    // 启用用户
    const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/updateById/list';
    return request.post(url, {
      params: commParams,
      data: userList,
    }).then(() => {
      return this.query({});
    }).catch(reason => {
      MsgBox.error({message: reason})
    });
  }

  checkEnableUser() {
    const { selectedRows} = this;
    if (selectedRows?.length <= 0) {
      MsgBox.warning({message: '请先选择用户'});
      return null;
    }

    if (selectedRows.filter(item => item.c_DV_STATE === 'LOCK').length > 0) {
      MsgBox.warning({message: '所选用户存在已锁定状态的用户, 解锁后才能启用或停用操作'});
      return null;
    }
    return selectedRows;
  }

  checkLockUser() {
    const { selectedRows} = this;
    if (selectedRows?.length <= 0) {
      MsgBox.warning({message: '请先选择用户'});
      return null;
    }

    if (selectedRows.filter(item => item.c_DV_STATE !== 'LOCK').length > 0) {
      MsgBox.warning({message: '所选部分用户为非锁定状态, 无需解锁'});
      return null;
    }
    return selectedRows;
  }

  checkEditUser() {
    const { selectedRows} = this;
    if (selectedRows?.length <= 0) {
      MsgBox.warning({message: '请先选择用户'});
      return null;
    }

    return selectedRows;
  }

}
