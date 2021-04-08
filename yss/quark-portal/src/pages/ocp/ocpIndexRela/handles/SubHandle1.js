import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { useModel } from 'umi';
import MsgBox from '@/utils/MsgBox';
import request from '@/utils/request';
import SubService1 from '../service/SubService1';

export default class SubHandle extends BaseHandle {
  constructor(props) {
    // const service = new SubService({
    //   base: '/ocp/indexrela/indexmode',
    //   bind: '/ocp/indexrela/indexmode/bind',
    //   unbind: '/ocp/indexrela/indexmode/unbind',
    // });
    const service = new SubService1();
    super({ service, ...props });
  }

  async query(pageNo, pageSize) {
    if (!this.masterSelectedRows.length) {
      MsgBox.warning({ message: '请至少勾选一个指标！' });
      return;
    }
    const indexCode = this.masterSelectedRows
      .filter((item) => item.indexType)
      .map((item) => item.indexCode);
    const indexCodePublic = this.masterSelectedRows
      .filter((item) => item.indexType && item.isPublic == '1')
      .map((item) => item.indexCode);
    /** 1.拿参数 */
    const queryParam = {};
    const form = this.searchForm.getFieldsValue();
    form.N_CHECK_STATE = form.N_CHECK_STATE || 'SearchAll';
    if (!form.C_BIND_STATE || !form.C_BIND_STATE.length) {
      form.C_BIND_STATE = ['ocp_handBind', 'ocp_autoBind', 'ocp_notBind', 'ocp_handUnbind'];
    }
    form.C_BIND_STATE = form.C_BIND_STATE.join(',');
    /** B区勾选的组合代码 */
    console.log(this.params);
    form.ARRAY_PORT_CODE = form.ARRAY_PORT_CODE || this.params.portCode.join(',');
    /** A区勾选的指标代码 */
    pageNo = pageNo || this.pageInfo.pageNo;
    pageSize = pageSize || this.pageInfo.pageSize;
    console.log('query');
    console.log(pageNo);
    console.log(pageSize);
    const pageIndexCode = indexCode.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    console.log('pageIndexCode');
    console.log(pageIndexCode.length);
    form.ARRAY_INDEX_CODE = pageIndexCode.join(',');
    this.setPageInfo({
      ...this.pageInfo,
      pageTotal: indexCode.length,
      pageNo,
      pageSize,
    });
    /** A区勾选的公共指标代码 */
    console.log('indexCodePublic');
    console.log(indexCodePublic);
    if (indexCodePublic.length) {
      form.ARRAY_PUBLIC_INDEX_CODE = indexCodePublic.join(',');
    }
    /** 2个固定的字段 */
    form.dataClass = 'MonitorIndexInfo';
    form.PortMode = 'IndexMode';
    console.log('this.params');
    console.log(this.params);
    queryParam.paraMap = form;
    queryParam.dictIndexMap = {};
    pageIndexCode.forEach((item) => {
      queryParam.dictIndexMap[item] = this.params.dictIndexMap[item];
    });
    queryParam.cacheAllPortList = this.params.cacheAllPortList || [];
    console.log('queryParam');
    console.log(queryParam);

    /** 2.调接口 */
    this.setLoading(true);
    const response = await this.service.query(queryParam);
    this.setLoading(false);
    console.log('接口response');
    console.log(response);
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
          row.portCode && (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
      );
    }

    const refreshParam = {};
    const dictIndexMap = {};
    const parent = [];
    indexRows.forEach((item) => {
      if (!parent.includes(item.indexCode)) {
        parent.push(item.indexCode);
      }
    });
    parent.forEach((code) => {
      dictIndexMap[code] = this.dataSource.find((row) => row.indexCode === code).indexName;
    });
    refreshParam.dictIndexMap = dictIndexMap;
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    indexRows.forEach((item) => {
      if (!paraMap[item.indexCode]) {
        paraMap[item.indexCode] = item.portCode;
      } else {
        paraMap[item.indexCode] += `,${item.portCode}`;
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
                if (!item.portCode) {
                  this.dataSource.forEach((parent) => {
                    if (parent.indexCode === item.indexCode) {
                      Object.keys(item).forEach((key) => {
                        parent[key] = item[key];
                      });
                    }
                  });
                } else if (indexRows.length === 1) {
                  const parent = dataList.find((item) => !item.portCode);
                  const child = dataList.find((item) => item.portCode);
                  // // 1.找父节点
                  this.dataSource.forEach((item) => {
                    if (item.indexCode === parent.indexCode) {
                      item.children.forEach((item2) => {
                        if (item2.portCode === child.portCode) {
                          Object.keys(child).forEach((key) => {
                            item2[key] = child[key];
                          });
                        }
                      });
                    }
                  });
                } else {
                  indexRows.forEach((selectRow) => {
                    if (selectRow.portCode === item.portCode) {
                      Object.keys(item).forEach((key) => {
                        selectRow[key] = item[key];
                      });
                    }
                  });
                }
              });

              /** const editRows = response.data.dataList.filter((item) => item.portCode);
              indexRows.forEach((item) => {
                const index = editRows.findIndex((row) => row.portCode === item.portCode);
                const one = editRows.find((row) => row.portCode === item.portCode);
                // item.bindState = editRows[index].bindState;
                const keys = Object.keys(one);
                keys.forEach((key) => {
                  item[key] = one[key];
                });
              });*/
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
    //     row.portCode &&
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
        const dictIndexMap = {};
        const parent = [];
        indexRows.forEach((item) => {
          if (!parent.includes(item.indexCode)) {
            parent.push(item.indexCode);
          }
        });
        parent.forEach((code) => {
          dictIndexMap[code] = this.dataSource.find((row) => row.indexCode === code).indexName;
        });
        refreshParam.dictIndexMap = dictIndexMap;
        refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
        const paraMap = {};
        indexRows.forEach((item) => {
          if (!paraMap[item.indexCode]) {
            paraMap[item.indexCode] = item.portCode;
          } else {
            paraMap[item.indexCode] += `,${item.portCode}`;
          }
        });
        refreshParam.paraMap = paraMap;
        this.service.refresh(refreshParam).then((response) => {
          const { dataList } = response.data;

          dataList.forEach((item) => {
            if (!item.portCode) {
              this.dataSource.forEach((parent) => {
                if (parent.indexCode === item.indexCode) {
                  Object.keys(item).forEach((key) => {
                    const aParent = parent;
                    aParent[key] = item[key];
                  });
                }
              });
            } else if (indexRows.length === 1) {
              const parent = dataList.find((item) => !item.portCode);
              const child = dataList.find((item) => item.portCode);
              // // 1.找父节点
              this.dataSource.forEach((item) => {
                if (item.indexCode === parent.indexCode) {
                  item.children.forEach((item2) => {
                    if (item2.portCode === child.portCode) {
                      Object.keys(child).forEach((key) => {
                        item2[key] = child[key];
                      });
                    }
                  });
                }
              });
            } else {
              indexRows.forEach((selectRow) => {
                if (selectRow.portCode === item.portCode) {
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
    // 把父结点排除掉
    const indexRows = selectedRows.filter(
      (row) =>
        row.indexCode &&
        row.auditState === 0 &&
        (row.bindState === 'ocp_handUnbind' || row.bindState === 'ocp_notBind'),
    );
    const refreshParam = {};
    const dictIndexMap = {};
    const parent = [];
    indexRows.forEach((item) => {
      if (!parent.includes(item.indexCode)) {
        parent.push(item.indexCode);
      }
    });
    parent.forEach((code) => {
      dictIndexMap[code] = this.dataSource.find((row) => row.indexCode === code).indexName;
    });
    refreshParam.dictIndexMap = dictIndexMap;
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    indexRows.forEach((item) => {
      if (!paraMap[item.indexCode]) {
        paraMap[item.indexCode] = item.portCode;
      } else {
        paraMap[item.indexCode] += `,${item.portCode}`;
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
                if (item.portCode) {
                  indexRows.forEach((selectRow) => {
                    if (selectRow.portCode === item.portCode) {
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
}
