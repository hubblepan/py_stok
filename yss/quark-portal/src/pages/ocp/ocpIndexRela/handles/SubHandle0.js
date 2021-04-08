import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import MsgBox from '@/utils/MsgBox';
import request from '@/utils/request';
import SubService0 from '../service/SubService0';

export default class SubHandle extends BaseHandle {
  constructor(props) {
    // const service = new SubService({
    //   base: '/ocp/indexrela/portmode',
    //   bind: '/ocp/indexrela/portmode/bind',
    //   unbind: '/ocp/indexrela/portmode/unbind',
    // });
    const service = new SubService0();
    super({ service, ...props });
  }

  async query(pageNo, pageSize) {
    console.log('query');
    console.log(pageNo);
    console.log(pageSize);
    if (!this.masterSelectedRows.length) {
      MsgBox.warning({ message: '请至少勾选一个组合！' });
      return;
    }
    console.log('this.params');
    console.log(this.params);
    const portCode = this.masterSelectedRows
      .filter((item) => item.dATA_TYPE === 'PORT_TYPE')
      .map((item) => item.c_PORT_CODE);
    const portCodeFilter = portCode.filter((code) => !this.params.portFilter.includes(code));
    /** 1.拿参数 */
    const queryParam = {};
    const form = this.searchForm.getFieldsValue();
    form.N_CHECK_STATE = form.N_CHECK_STATE || 'SearchAll';
    if (!form.C_BIND_STATE || !form.C_BIND_STATE.length) {
      form.C_BIND_STATE = ['ocp_handBind', 'ocp_autoBind', 'ocp_notBind', 'ocp_handUnbind'];
    }
    form.C_BIND_STATE = form.C_BIND_STATE.join(',');
    /** B区勾选的指标代码 */
    form.ARRAY_INDEX_CODE = form.ARRAY_INDEX_CODE || this.params.indexCode.join(',');
    /** A区勾选的组合代码 */
    pageNo = pageNo || this.pageInfo.pageNo;
    pageSize = pageSize || this.pageInfo.pageSize;
    console.log('query');
    console.log(pageNo);
    console.log(pageSize);
    const pagePortCodeFilter = portCodeFilter.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    form.ARRAY_PORT_CODE = pagePortCodeFilter.join(',');
    console.log('this.pageInfo');
    console.log(this.pageInfo);
    this.setPageInfo({
      ...this.pageInfo,
      pageTotal: portCodeFilter.length,
      pageNo,
      pageSize,
    });
    /** 2个固定的字段 */
    form.dataClass = 'MonitorIndexInfo';
    form.PortMode = 'PortMode';

    queryParam.paraMap = form;
    queryParam.dictIndexMap = this.params.dictIndexMap || {};
    queryParam.cacheAllPortList = this.params.cacheAllPortList || [];
    console.log('queryParam');
    console.log(queryParam);

    /** 2.调接口 */
    this.setLoading(true);
    const response = await this.service.query(queryParam);
    this.setLoading(false);
    // this.changeResult({
    //   dataSource: response?.data?.list,
    // });
    this.setDataSource(response?.data?.list);
    this.changeSelectedRows([], []);
  }

  bind(options) {
    const { record } = options;
    let indexRows = null;
    if (record) {
      indexRows = [record];
    } else {
      const { selectedRows } = this;

      // 把父结点排除掉
      indexRows = selectedRows.filter(
        (row) =>
          row.indexCode && (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
      );
    }

    const refreshParam = {};
    refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    indexRows.forEach((item) => {
      if (!paraMap[item.portCode]) {
        paraMap[item.portCode] = item.indexCode;
      } else {
        paraMap[item.portCode] += `,${item.indexCode}`;
      }
    });
    refreshParam.paraMap = paraMap;
    const { service } = this;

    MsgBox.confirm({
      title: '绑定',
      content: '是否确认绑定所选择的记录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          service.bind(indexRows).then(() => {
            service.refresh(refreshParam).then((response) => {
              const { dataList } = response.data;

              dataList.forEach((item) => {
                if (!item.indexCode) {
                  this.dataSource.forEach((parent) => {
                    if (parent.portCode === item.portCode) {
                      Object.keys(item).forEach((key) => {
                        parent[key] = item[key];
                      });
                    }
                  });
                } else if (indexRows.length === 1) {
                  const parent = dataList.find((item) => !item.indexCode);
                  const child = dataList.find((item) => item.indexCode);
                  // // 1.找父节点
                  this.dataSource.forEach((item) => {
                    if (item.portCode === parent.portCode) {
                      item.children.forEach((item2) => {
                        if (item2.indexCode === child.indexCode) {
                          Object.keys(child).forEach((key) => {
                            item2[key] = child[key];
                          });
                        }
                      });
                    }
                  });
                } else {
                  indexRows.forEach((selectRow) => {
                    if (selectRow.indexCode === item.indexCode) {
                      Object.keys(item).forEach((key) => {
                        selectRow[key] = item[key];
                      });
                    }
                  });
                }
              });
              this.changeState({
                dataSource: this.dataSource,
                currentRecord: null,
                selectedRows: [],
                selectedRowKeys: [],
              });
            });
          });
        } catch (e) {
          MsgBox.error({ message: '绑定失败' });
        }
      },
    });
  }

  unbind() {
    this.setUnbindVisible(true);
    // const { selectedRows, service } = this;
    // // 把父结点排除掉
    // const indexRows = selectedRows.filter(
    //   (row) =>
    //     row.indexCode &&
    //     row.auditState === 1 &&
    //     (row.bindState === 'ocp_autoBind' || row.bindState === 'ocp_handBind'),
    // );
    // console.log(indexRows);
    // MsgBox.confirm({
    //   title: '解绑',
    //   content: '是否确认解绑所选择的记录？',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     try {
    //       service.unbind(indexRows).then(() => {
    //         this.query();
    //       });
    //     } catch (e) {
    //       MsgBox.error({ message: '解绑失败' });
    //     }
    //   },
    // });
  }

  unbinds({ indexRows, setConfirmLoading, setVisible }) {
    this.service
      .unbind(indexRows)
      .then(() => {
        setConfirmLoading(false);
        setVisible(false);
        const refreshParam = {};
        refreshParam.dictIndexMap = this.params.dictIndexMap || {};
        refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
        const paraMap = {};
        indexRows.forEach((item) => {
          if (!paraMap[item.portCode]) {
            paraMap[item.portCode] = item.indexCode;
          } else {
            paraMap[item.portCode] += `,${item.indexCode}`;
          }
        });
        refreshParam.paraMap = paraMap;
        this.service.refresh(refreshParam).then((response) => {
          const { dataList } = response.data;

          dataList.forEach((item) => {
            if (!item.indexCode) {
              this.dataSource.forEach((parent) => {
                if (parent.portCode === item.portCode) {
                  Object.keys(item).forEach((key) => {
                    const aParent = parent;
                    aParent[key] = item[key];
                  });
                }
              });
            } else if (indexRows.length === 1) {
              const parent = dataList.find((item) => !item.indexCode);
              const child = dataList.find((item) => item.indexCode);
              // // 1.找父节点
              this.dataSource.forEach((item) => {
                if (item.portCode === parent.portCode) {
                  item.children.forEach((item2) => {
                    if (item2.indexCode === child.indexCode) {
                      Object.keys(child).forEach((key) => {
                        item2[key] = child[key];
                      });
                    }
                  });
                }
              });
            } else {
              indexRows.forEach((selectRow) => {
                if (selectRow.indexCode === item.indexCode) {
                  Object.keys(item).forEach((key) => {
                    selectRow[key] = item[key];
                  });
                }
              });
            }
          });
          this.changeState({
            dataSource: this.dataSource,
            currentRecord: null,
            selectedRows: [],
            selectedRowKeys: [],
          });
        });
        MsgBox.success({ message: '解绑成功' });
      })
      .catch(() => {
        MsgBox.error({ message: '解绑失败' });
      });
  }

  unbindSingle(record) {
    this.setUnbindVisible(true);
    // const { service } = this;
    // const indexRows = [];
    // indexRows.push(record);
    // MsgBox.confirm({
    //   title: '解绑',
    //   content: '是否确认解绑所选择的记录？',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     try {
    //       service.unbind(indexRows).then(() => {
    //         this.query();
    //       });
    //     } catch (e) {
    //       MsgBox.error({ message: '解绑失败' });
    //     }
    //   },
    // });
  }

  check() {
    const { service, selectedRows } = this;
    // 把父结点排除掉 & 只传可以审核的行
    const indexRows = selectedRows.filter(
      (row) =>
        row.indexCode &&
        row.auditState === 0 &&
        (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
    );
    const refreshParam = {};
    refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    indexRows.forEach((item) => {
      if (!paraMap[item.portCode]) {
        paraMap[item.portCode] = item.indexCode;
      } else {
        paraMap[item.portCode] += `,${item.indexCode}`;
      }
    });
    refreshParam.paraMap = paraMap;
    MsgBox.confirm({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          service.check(indexRows).then(() => {
            service.refresh(refreshParam).then((response) => {
              const { dataList } = response.data;

              dataList.forEach((item) => {
                if (item.indexCode) {
                  indexRows.forEach((selectRow) => {
                    if (selectRow.indexCode === item.indexCode) {
                      Object.keys(item).forEach((key) => {
                        selectRow[key] = item[key];
                      });
                    }
                  });
                }
              });
              this.changeState({
                dataSource: this.dataSource,
                selectedRows: [],
                selectedRowKeys: [],
              });
            });
          });
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
  }

  // uncheck() {
  //   const { selectedRows } = this;
  //   // 把父结点排除掉
  //   const indexRows = selectedRows.filter((item) => item.indexCode);
  //   MsgBox.confirm({
  //     title: '审核',
  //     content: '是否确定审核未审核的记录?',
  //     okText: '确认',
  //     cancelText: '取消',
  //     onOk: () => {
  //       try {
  //         this.service.uncheck(indexRows);
  //         this.query();
  //       } catch (e) {
  //         MsgBox.error({ message: '审核数据失败' });
  //       }
  //     },
  //   });
  // }
}
