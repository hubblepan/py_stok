import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';
import MsgBox from '@/utils/MsgBox';
import IndexSubService from '../service/IndexSubService';

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new IndexSubService();
    // const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, ...model });
  }

  diyParamConfig() {
    this.changeState({
      editIndexVisible: true,
      currentRecord: this.selectedRows[0],
    });
  }

  async query(pageNo, pageSize) {
    if (!this.masterSelectedRows.length) {
      MsgBox.warning({ message: '请至少勾选一个组合！' });
      return;
    }
    const indexCode = this.masterSelectedRows
      .filter((item) => item.indexType)
      .map((item) => item.indexCode);
    const indexCodePublic = this.masterSelectedRows
      .filter((item) => item.indexType && item.isPublic == '1')
      .map((item) => item.indexCode);

    /** 拿参数 */
    const queryParam = {};
    const form = this.searchForm.getFieldsValue();
    form.N_CHECK_STATE = 'SearchAll';
    form.C_PARAM_TYPE =
      form.OCP_PARAMTYPE || 'ocp_indexParam,ocp_groupParam,ocp_portParam,ocp_noPara';

    /** A区勾选的指标代码 */

    pageNo = pageNo || this.pageInfo.pageNo;
    pageSize = pageSize || this.pageInfo.pageSize;

    console.log('query');
    console.log(pageNo);
    console.log(pageSize);

    const pageIndexCode = indexCode.slice((pageNo - 1) * pageSize, pageNo * pageSize);

    console.log('pageIndexCode');
    console.log(pageIndexCode.length);

    form.ARRAY_PORT_CODE = pageIndexCode.join(',');
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
    /** 2个固定的字段，写死 */
    form.dataClass = 'OcpIndexParam';
    form.SearchMode = 'IndexMode';
    console.log('form');
    console.log(form);
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

    this.setLoading(true);
    const result = await this.service.query(queryParam);
    this.setLoading(false);
    // this.changeResult({
    //   dataSource: result?.data?.list,
    // });

    this.setDataSource(result?.data?.list);
    this.changeSelectedRows([], []);
  }

  check() {
    const { selectedRows } = this;

    console.log('selectedRows', selectedRows);
    // 把父结点排除掉 & 只传可以审核的行
    const indexRows = selectedRows.filter((row) => row.indexCode && row.auditState === 0);

    console.log('筛选可审核indexRows');
    console.log(indexRows);

    console.log('this.params.dictIndexMap');
    console.log(this.params.dictIndexMap);

    // A区选中
    const indexCode = this.masterSelectedRows
      .filter((item) => item.indexType)
      .map((item) => item.indexCode);

    console.log('indexCode');
    console.log(indexCode);

    const paraMap = {};
    paraMap.SearchMode = 'IndexMode';
    indexRows.forEach((item) => {
      if (!paraMap[item.indexCode]) {
        paraMap[item.indexCode] = item.relaCode;
      } else {
        paraMap[item.indexCode] += `,${item.relaCode}`;
      }
    });

    // 局部刷新参数
    const refreshParam = {};
    refreshParam.dictIndexMap = {};

    indexRows.forEach((item) => {
      refreshParam.dictIndexMap[item.indexCode] = this.params.dictIndexMap[item.indexCode];
    });

    console.log('refreshParam.dictIndexMap', refreshParam.dictIndexMap);
    // indexCode.forEach((item) => {
    //   refreshParam.dictIndexMap[item] = this.params.dictIndexMap[item];
    // });

    // refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];

    // 局部刷新的paraMap
    const paraMap1 = {};
    paraMap1.SearchMode = 'IndexMode';

    indexRows.forEach((item) => {
      if (!paraMap1[item.indexCode]) {
        paraMap1[item.indexCode] = item.relaCode;
      } else {
        paraMap1[item.indexCode] += `,${item.relaCode}`;
      }
    });

    console.log(Object.keys(paraMap1));

    Object.keys(paraMap1).forEach((item) => {
      if (paraMap1[item].includes('-')) {
        paraMap1[item] = '';
      }
    });

    refreshParam.paraMap = paraMap1;

    console.log('refreshParam', refreshParam);

    if (selectedRows.length !== indexRows.length && selectedRows.length !== 1) {
      console.log('gggggggggggg');
      MsgBox.confirm({
        title: '审核',
        content:
          '在执行审核操作中含有不支持审核的数据，是否继续操作？如果继续，不支持审核的数据不会被审核！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          try {
            this.service.check(indexRows).then(() => {
              // this.query();
              this.service.refresh(refreshParam).then((response) => {
                console.log(response);
                const { dataList } = response.data;
                console.log('指标模式--局部刷新dataList', dataList);
                console.log('指标模式--dataSource', this.dataSource);
                const nodeDataSource = [];
                this.dataSource.forEach((item) => {
                  item.children.forEach((x) => {
                    nodeDataSource.push(x);
                  });
                });

                console.log('指标模式--nodeDataSource', nodeDataSource);

                dataList.forEach((item) => {
                  if (item.code) {
                    nodeDataSource.forEach((selectRow) => {
                      if (selectRow.code === item.code && selectRow.indexCode === item.indexCode) {
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
    } else if (
      selectedRows[0].paramType === 'ocp_indexParam' &&
      selectedRows[0].parentCode !== '[root]'
    ) {
      MsgBox.confirm({
        title: '审核',
        content: '指标参数记录不支持审核操作，请在指标节点进行审核！',
        okText: '确认',
        cancelText: '取消',
      });
    } else {
      MsgBox.confirm({
        title: '审核',
        content: '是否确定审核未审核的记录?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          try {
            this.service.check(indexRows).then(() => {
              // this.query();
              this.service.refresh(refreshParam).then((response) => {
                console.log(response);
                const { dataList } = response.data;
                console.log('指标模式--局部刷新dataList', dataList);
                console.log('指标模式--dataSource', this.dataSource);
                const nodeDataSource = [];
                this.dataSource.forEach((item) => {
                  item.children.forEach((x) => {
                    nodeDataSource.push(x);
                  });
                });

                console.log('指标模式--nodeDataSource', nodeDataSource);

                dataList.forEach((item) => {
                  if (item.code) {
                    nodeDataSource.forEach((selectRow) => {
                      if (selectRow.code === item.code && selectRow.indexCode === item.indexCode) {
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

  uncheck() {
    const { selectedRows } = this;
    // 把父结点排除掉 & 只传可以反审核的行
    const indexRows = selectedRows.filter((row) => row.indexCode && row.auditState === 1);

    // A区选中
    const indexCode = this.masterSelectedRows
      .filter((item) => item.indexType)
      .map((item) => item.indexCode);

    const paraMap = {};
    paraMap.SearchMode = 'IndexMode';
    indexRows.forEach((item) => {
      if (!paraMap[item.indexCode]) {
        paraMap[item.indexCode] = item.relaCode;
      } else {
        paraMap[item.indexCode] += `,${item.relaCode}`;
      }
    });

    // 局部刷新
    const refreshParam = {};
    refreshParam.dictIndexMap = {};

    indexRows.forEach((item) => {
      refreshParam.dictIndexMap[item.indexCode] = this.params.dictIndexMap[item.indexCode];
    });

    console.log('refreshParam.dictIndexMap', refreshParam.dictIndexMap);
    // indexCode.forEach((item) => {
    //   refreshParam.dictIndexMap[item] = this.params.dictIndexMap[item];
    // });

    // refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];

    // 局部刷新的paraMap
    const paraMap1 = {};
    paraMap1.SearchMode = 'IndexMode';

    indexRows.forEach((item) => {
      if (!paraMap1[item.indexCode]) {
        paraMap1[item.indexCode] = item.relaCode;
      } else {
        paraMap1[item.indexCode] += `,${item.relaCode}`;
      }
    });

    console.log(Object.keys(paraMap1));

    Object.keys(paraMap1).forEach((item) => {
      if (paraMap1[item].includes('-')) {
        paraMap1[item] = '';
      }
    });

    refreshParam.paraMap = paraMap1;

    // const indexRows1 = selectedRows.filter(
    //   (row) => row.indexCode && row.auditState === 1 && row.paramType !== 'ocp_indexParam',
    // );

    if (selectedRows.length !== indexRows.length && selectedRows.length !== 1) {
      console.log('ggggggg');
      MsgBox.confirm({
        title: '反审核',
        content:
          '在审核操作中含有不支持反审核的数据，是否继续操作？如果继续，不支持反审核的数据不会被反审核！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          try {
            this.service.uncheck(indexRows).then(() => {
              // this.query();
              this.service.refresh(refreshParam).then((response) => {
                console.log(response);
                const { dataList } = response.data;
                console.log('指标模式--局部刷新dataList', dataList);
                console.log('指标模式--dataSource', this.dataSource);
                const nodeDataSource = [];
                this.dataSource.forEach((item) => {
                  item.children.forEach((x) => {
                    nodeDataSource.push(x);
                  });
                });

                console.log('指标模式--nodeDataSource', nodeDataSource);

                dataList.forEach((item) => {
                  if (item.code) {
                    nodeDataSource.forEach((selectRow) => {
                      if (selectRow.code === item.code && selectRow.indexCode === item.indexCode) {
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
            MsgBox.error({ message: '反审核数据失败' });
          }
        },
      });
    } else if (
      selectedRows[0].paramType === 'ocp_indexParam' &&
      selectedRows[0].parentCode !== '[root]'
    ) {
      MsgBox.confirm({
        title: '反审核',
        content: '指标参数记录不支持反审核操作，请在指标节点进行反审核！',
        okText: '确认',
        cancelText: '取消',
      });
    } else {
      MsgBox.confirm({
        title: '反审核',
        content: '是否确定审核已审核的记录?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          try {
            this.service.uncheck(indexRows).then(() => {
              // this.query();
              this.service.refresh(refreshParam).then((response) => {
                console.log(response);
                const { dataList } = response.data;
                console.log('指标模式--局部刷新dataList', dataList);
                console.log('指标模式--dataSource', this.dataSource);
                const nodeDataSource = [];
                this.dataSource.forEach((item) => {
                  item.children.forEach((x) => {
                    nodeDataSource.push(x);
                  });
                });

                console.log('指标模式--nodeDataSource', nodeDataSource);

                dataList.forEach((item) => {
                  if (item.code) {
                    nodeDataSource.forEach((selectRow) => {
                      if (selectRow.code === item.code && selectRow.indexCode === item.indexCode) {
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
            MsgBox.error({ message: '反审核数据失败' });
          }
        },
      });
    }
  }
}
