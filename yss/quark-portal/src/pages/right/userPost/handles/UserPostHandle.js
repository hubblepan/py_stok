import BaseHandle from '@/handles/BaseHandle';
import UserPostService from '../service/UserPostService';
import request from "@/utils/request";
import {Checkbox} from "antd";
import React from "react";
import moment from 'moment';
import MsgBox from "@/utils/MsgBox";
import AppContext from "@/utils/AppContext";

const commParams = {serviceId: 'osgi-fast'};
let newInstance = null;

export default class UserPostHandle extends BaseHandle {
  constructor(model) {
    const service = new UserPostService({ base: '/api/post' });
    super({service,...model});
    newInstance = this;
  };

  getPosts = () =>{
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryPosts';
    return request.post(url,{params: commParams, data: {}});
  };

  getUsers = () => {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getEnabledOrgUserList';
    return request.post(url,{params: commParams})
  };

  // 页面加载后初始化 查询参数 数据
  async initSearchData() {
    this.changeState({loading: true});
    this.getUsers()
      .then(res => {
        const userData = res.data.filter(item => item.c_DATA_TYPE === 'USER').map(item => {
          return {...item, title: item.c_CORP_ORG_NAME, value: item.c_CORP_ORG_CODE};
        });
        this.changeState({userData});
        return this.getPosts();
      })
      .then(res => {
        const postData = res.data.map(post => {
          return {...post, title: post.c_POST_NAME, value: post.c_POST_CODE}
        });
        this.changeState({postData});
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  queryUserPost = (userList) => {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/queryListByCondition';
    return request.post(url, {params: commParams, data: {dataClass: 'UserPost', ARRAY_C_USER_CODE: userList.join(',')}});
  }

  queryUserPostPage = (options, userList, postList) => {
    const postMap = {};
    this.postData.forEach(item => {
      postMap[item.c_POST_CODE] = item;
    });
    const userMap = {};
    this.userData.forEach(item => {
      userMap[item.c_CORP_ORG_CODE] = item;
    });

    const getParaMap = () => {
      return {
        dataClass: 'UserPost',
        ARRAY_C_USER_CODE: userList.join(','),
        ARRAY_C_POST_CODE: postList.join(','),
        N_CHECK_STATE: 'SearchAll',
      };
    };
    // 获取总数量
    let pageInfo = options?.pageInfo;
    if (!pageInfo) {
      pageInfo = {
        pageNo: 1,
        pageSize: this.pageInfo?.pageSize || 20,  // changeResult 会把 pageInfo 置空
        pageTotal: 0,
      }
    }
    const queryDataTotal = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/queryDataTotal';
    request.post(queryDataTotal, {
      params: commParams,
      data: getParaMap(),
    }).then(totalRes => {
      // 获取分页数据
      pageInfo.pageTotal = totalRes.data;
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/queryByCondition/page';
      return request.post(url, {
        params: commParams,
        data: {
          paraMap: getParaMap(),
          page: pageInfo,
        },
      })
    })
    .then(res => {
      res?.data?.dataList.forEach(item => {
        item.c_POST_NAME = postMap[item.c_POST_CODE].c_POST_NAME;
        item.c_USER_NAME = userMap[item.c_USER_CODE].c_CORP_ORG_NAME;
      });
      this.changeResult({dataSource: res?.data?.dataList, pageInfo,
        editMode: false, // 权限编辑状态
        disableEdit: false,
        disableSave: true,})
    }).catch(reason => {
      console.log(reason);
      this.setLoading(false);
    });



  }



  // {userCodes: [], postCodes: []}
  getQueryParams = () => {
    // 查询参数
    const searchParams = this.searchForm?.getFieldsValue();
    return {
      userCodes: searchParams?.userCodes?.length > 0 ? searchParams.userCodes : this.userData.map(item => item.c_CORP_ORG_CODE),
      postCodes: searchParams?.postCodes?.length > 0 ? searchParams.postCodes : this.postData.map(item => item.c_POST_CODE),
    }
  };

  queryInViewMode = () => {
    // loading
    if (!this.loading) {
      this.setLoading(true);
    }
    // 请求用户
    let dataSource = [];
    const userPostMap = {};
    const userMap = {};
    const postMap = {};
    this.userData.forEach(item => {
      userMap[item.c_CORP_ORG_CODE] = item;
    });
    this.postData.forEach(item => {
      postMap[item.c_POST_CODE] = item;
    });
    const {userCodes, postCodes} = this.getQueryParams();
    this.queryUserPost(userCodes)
      .then(res => {
        // 首先将 res.data 转换成一个 二级 map 结构 map<userCode, map<postCode, item>> 的结构， 并存储起来
        res.data.forEach(item => {
          if (!userPostMap[item.c_USER_CODE]) {
            userPostMap[item.c_USER_CODE] = {};
          }
          userPostMap[item.c_USER_CODE][item.c_POST_CODE] = item;
        });

        // 然后生成table 数据
        dataSource = userCodes.map(userCode => {
          const tableItem = {};
          tableItem.c_USER_CODE = userCode;
          tableItem.c_USER_NAME = userMap[userCode].c_CORP_ORG_NAME;
          postCodes.forEach(postCode => {
            if (userPostMap?.[userCode]?.[postCode]) {
              tableItem[postCode] = userPostMap[userCode][postCode];
            } else {
              tableItem[postCode] = null;
            }
          });

          // 遍历对象， 判断审核状态
          let auditState = 1;  // 0 未审核， 1 已审核
          let checkEnable = false;
          let uncheckEnable = false;
          if (userPostMap[userCode]) {
            const postCodeMap = userPostMap[userCode];
            // eslint-disable-next-line no-restricted-syntax
            for (const postCode of Object.keys(postCodeMap)) {
              if (postCodeMap[postCode].auditState === 0) {
                auditState = 0;
                checkEnable = true;
              } else {
                uncheckEnable = true;
              }

              if (checkEnable && uncheckEnable) {
                break;
              }
            }
          } else {
            auditState = 0;
          }
          tableItem.auditState = auditState;
          tableItem.checkEnable = checkEnable;
          tableItem.uncheckEnable = uncheckEnable;
          return tableItem;
        });
        // dataSourceMap
        const dataSourceMap = {};
        dataSource.forEach(item => {
          dataSourceMap[item.c_USER_CODE] = item;
        })

        // 然后生成columns
        const columns = [
          {
            title: '用户编码',
            width: 150,
            ellipsis: true,
            dataIndex: 'c_USER_CODE',
            render: (text, record) => {
              if (record.auditState === 0) {
                if (record.checkEnable && record.uncheckEnable) { // text-primary
                  return (<span className="text-primary">{text}</span>)
                }
                return (<span className="text-warning">{text}</span>)
              }
              return (<span className="text-body">{text}</span>);
            }
          },
          {
            title: '用户名称',
            width: 150,
            ellipsis: true,
            dataIndex: 'c_USER_NAME',
            render: (text, record) => {
              if (record.auditState === 0) {
                if (record.checkEnable && record.uncheckEnable) { // text-primary
                  return (<span className="text-primary">{text}</span>)
                }
                return (<span className="text-warning">{text}</span>)
              }
              return (<span className="text-body">{text}</span>);
            }
          }
        ];
        postCodes.forEach(postCode => {
          columns.push({
            title: postMap[postCode].c_POST_NAME,
            width: 150,
            dataIndex: postCode,
            render: (text, record) => {
              record = newInstance.dataSourceMap[record.c_USER_CODE];
              return (
                <Checkbox disabled={!newInstance.editMode || (record.auditState === 1 || record[postCode]?.auditState === 1)} checked={record[postCode]} onChange={(e) => {
                  const {checked} = e.target;
                  // 如果 该行被选中时，才做下一步处理
                  if (newInstance.selectedRowKeys.indexOf(record.c_USER_CODE)=== -1) {
                    return;
                  }
                  if (checked) {
                    record[postCode] = newInstance.userPostMap[record.c_USER_CODE]?.[postCode] || {
                      modifier: AppContext.getUserCode(),
                      modifyDate:moment().format('YYYYMMDD HH:mm:ss'),
                      auditState:0,
                      c_USER_CODE:record.c_USER_CODE,
                      c_POST_CODE:postCode,
                      n_IS_AUTHORIZATION:'0',
                    }
                  } else {
                    record[postCode] = null;
                  }
                  newInstance.changeState({dataSource: [...newInstance.dataSource]});
                  //
                }
                }/>
              );

                // console.log('xxxxxxxx-selectedRows', newInstance.selectedRows, record);
                // newInstance.onRightChanged(text, newInstance.dataSourceMap[record.c_DATA_CODE], index, postItem);
            },
          });
        });
        const selectedRows = dataSource.filter(item => item.checkEnable || item.uncheckEnable);
        const selectedRowKeys = selectedRows.map(item => item.c_USER_CODE);
        this.changeResult({dataSource, dataSourceMap, userPostMap, columns, queryParams: {userCodes, postCodes},
          selectedRowKeys,
          selectedRows,
          editMode: false, // 权限编辑状态
          disableEdit: false,
          disableSave: true,});
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  queryInListMode(options) {
    // loading
    if (!this.loading) {
      this.setLoading(true);
    }
    const {userCodes, postCodes} = this.getQueryParams();
    this.queryUserPostPage(options, userCodes, postCodes);

  }

  query(options = {}) {
    console.log(options);
    if (this.viewMode === 'View') {
      this.queryInViewMode(options);
    } else {
      this.queryInListMode(options);
    }
  }


  // 用于区分用户点击查询 按钮的查询(主动查询会在条件不满足时进行提示)，而其他切换数据时的自动查询，则只有在条件满足时才会执行
  autoQuery() {
    if (this.userData?.length > 0 && this.postData?.length > 0) {
      this.query();
    }

  }

  async add1() {
    this.changeState({showAddUserPost: true});
  }

  edit() {
    this.changeState({editMode: true, disableEdit: true, disableSave: false});
  }

  save() {
    this.changeState({editMode: false, disableEdit: false, disableSave: true});
    const { queryParams, dataSourceMap} = this; // 选择的行
    const userPostList = [];
    // 根据当前的查询数据， 进行保存
    queryParams.userCodes.forEach(userCode => {
      const record = dataSourceMap[userCode];
      queryParams.postCodes.forEach(postCode => {
        if (record[postCode]) {
          userPostList.push(record[postCode]);
        }
      });
    });
    const requestParams = {
      targetUserCodes: queryParams.userCodes.join(','),
      targetPostCodes: queryParams.postCodes.join(','),
      userPosts: userPostList,
    };
    this.setLoading(true);
    request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/updateUserPostBatchs', {
      params: commParams,
      data: requestParams,
    }).then(res => {
      this.setLoading(false);
      this.autoQuery();

    }).catch(reason => {
      console.log(reason);
      this.setLoading(false);
    });
  }

  check1() {
    this.commonConfirm('是否要将选中的记录执行[审核]操作',() => {
      this.requestCheck()
        .then(res => {
          this.autoQuery();
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }

  uncheck1() {
    this.commonConfirm('是否要将选中的记录执行[反审核]操作',() => {
      this.requestUncheck()
        .then(res => {
          this.autoQuery();
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }

  requestUncheck() {
    const { selectedRowKeys, selectedRows, queryParams} = this; // 选择的行
    if (this.viewMode === 'View') {
      const params = {targetUserCodes: selectedRowKeys.join(','), targetPostCodes: queryParams.postCodes.join(','), funCode: 'UserPostData'}
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/unAuditByUserAndPostCodes'
      return request.post(url, {
        params: commParams,
        data: params,
      });
    } else {
      const params = selectedRows.map(item => ({...item, operator: AppContext.getUserCode()}));
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/unAuditById/list';
      return request.post(url, {
        params: commParams,
        data: params,
      })
    }
  }

  requestCheck() {
    const { selectedRowKeys, selectedRows, queryParams} = this; // 选择的行
    if (this.viewMode === 'View') {
      const params = {targetUserCodes: selectedRowKeys.join(','), targetPostCodes: queryParams.postCodes.join(','), funCode: 'UserPostData'}
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/auditByUserAndPostCodes'
      return request.post(url, {
        params: commParams,
        data: params,
      });
    } else {
      const params = selectedRows.map(item => ({...item, operator: AppContext.getUserCode()}));
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostServiceController/auditById/list';
      return request.post(url, {
        params: commParams,
        data: params,
      })
    }

  }

  commonConfirm(content, onOk) {
    MsgBox.confirm({
      title: '提示',
      content,
      okText: '是',
      cancelText: '否',
      onOk});
  };

};
