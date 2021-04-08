import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';
import MsgBox from '@/utils/MsgBox';
import CombinSubService from '../service/CombinSubService';

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new CombinSubService();
    // const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, ...model });
  }

  diyParamConfig() {
    if (this.masterSelectedRows.length === 0) {
      MsgBox.warning({ message: '请选择一条主表数据！' });
    } else if (this.selectedRows.length === 0) {
      MsgBox.warning({ message: '请选择一条子表数据！' });
    } else {
      this.changeState({
        editVisible: true,
        currentRecord: this.selectedRows[0],
      });
    }
  }

  async query(pageNo, pageSize) {
    if (!this.masterSelectedRows.length) {
      MsgBox.warning({ message: '请至少勾选一个组合！' });
      return;
    }
    const portCode = this.masterSelectedRows
      .filter((item) => item.dATA_TYPE === 'PORT_TYPE')
      .map((item) => item.c_PORT_CODE);
    // console.log('portFilter-----');
    // console.log(this.params);
    const portCodeFilter = portCode.filter((code) => !this.params.portFilter.includes(code));
    /** 拿参数 */
    const queryParam = {};
    const form = this.searchForm.getFieldsValue();
    form.N_CHECK_STATE = 'SearchAll';
    form.C_PARAM_TYPE =
      form.OCP_PARAMTYPE || 'ocp_indexParam,ocp_groupParam,ocp_portParam,ocp_noPara';
    /** B区勾选的指标代码 */
    form.ARRAY_INDEX_CODE = form.ARRAY_INDEX_CODE || this.params.indexCode.join(',');
    /** A区勾选的组合代码 */

    pageNo = pageNo || this.pageInfo.pageNo;
    pageSize = pageSize || this.pageInfo.pageSize;
    const pagePortCodeFilter = portCodeFilter.slice((pageNo - 1) * pageSize, pageNo * pageSize);

    form.ARRAY_PORT_CODE = pagePortCodeFilter.join(',');

    this.setPageInfo({
      ...this.pageInfo,
      pageTotal: portCodeFilter.length,
      pageNo,
      pageSize,
    });
    /** 2个固定的字段，写死 */
    form.dataClass = 'OcpIndexParam';
    form.SearchMode = 'PortMode';
    // console.log('form');
    // console.log(form);
    // console.log('this.params');
    // console.log(this.params);
    queryParam.paraMap = form;
    queryParam.dictIndexMap = this.params.dictIndexMap || {};
    queryParam.cacheAllPortList = this.params.cacheAllPortList || [];
    // console.log('queryParam');
    // console.log(queryParam);

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
    const indexRows = selectedRows.filter(
      (row) =>
        row.indexCode &&
        row.auditState === 0 &&
        row.paramType !== 'ocp_indexParam' &&
        row.paramType !== 'ocp_groupParam',
    );

    console.log('筛选已审核indexRows');
    console.log(indexRows);

    const refreshParam = {};
    refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    paraMap.SearchMode = 'PortMode';
    indexRows.forEach((item) => {
      if (!paraMap[item.parentCode]) {
        paraMap[item.parentCode] = item.indexCode;
      } else {
        paraMap[item.parentCode] += `,${item.indexCode}`;
      }
    });
    refreshParam.paraMap = paraMap;

    console.log('refreshParam', refreshParam);

    if (selectedRows.length !== indexRows.length && selectedRows.length !== 1) {
      console.log('kkkkkkkkkkkk');
      MsgBox.confirm({
        title: '审核',
        content:
          '在审核操作中含有不支持审核的数据，是否继续操作？如果继续，不支持审核的数据不会被审核！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          try {
            this.service.check(indexRows).then(() => {
              // this.query();
              this.service.refresh(refreshParam).then((response) => {
                console.log(response);

                const { dataList } = response.data;
                console.log('局部刷新dataList', dataList);

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
                // const editRows = response.data.dataList.filter((item) => item.indexCode);
                // indexRows.forEach((item) => {
                //   const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                //   const one = editRows.find((row) => row.indexCode === item.indexCode);
                //   const keys = Object.keys(one);
                //   keys.forEach((key) => {
                //     item[key] = one[key];
                //   });
                // });
                // this.changeState({
                //   dataSource: this.dataSource,
                // });
                // this.changeSelectedRows([], []);
              });
            });
          } catch (e) {
            MsgBox.error({ message: '审核数据失败' });
          }
        },
      });
    } else if (
      selectedRows[0].paramType === 'ocp_indexParam' ||
      selectedRows[0].paramType === 'ocp_groupParam'
    ) {
      MsgBox.confirm({
        title: '审核',
        content: '指标参数和分类参数记录不支持审核操作，请在指标模式下进行审核！',
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
                console.log('局部刷新dataList', dataList);

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
                // const editRows = response.data.dataList.filter((item) => item.indexCode);
                // indexRows.forEach((item) => {
                //   const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                //   const one = editRows.find((row) => row.indexCode === item.indexCode);
                //   const keys = Object.keys(one);
                //   keys.forEach((key) => {
                //     item[key] = one[key];
                //   });
                // });
                // this.changeState({
                //   dataSource: this.dataSource,
                // });
                // this.changeSelectedRows([], []);
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
    const indexRows = selectedRows.filter(
      (row) =>
        row.indexCode &&
        row.auditState === 1 &&
        row.paramType !== 'ocp_indexParam' &&
        row.paramType !== 'ocp_groupParam',
    );

    console.log('筛选已审核indexRows');
    console.log(indexRows);

    const refreshParam = {};
    refreshParam.dictIndexMap = this.params.dictIndexMap || {};
    refreshParam.cacheAllPortList = this.params.cacheAllPortList || [];
    const paraMap = {};
    paraMap.SearchMode = 'PortMode';
    indexRows.forEach((item) => {
      if (!paraMap[item.parentCode]) {
        paraMap[item.parentCode] = item.indexCode;
      } else {
        paraMap[item.parentCode] += `,${item.indexCode}`;
      }
    });
    refreshParam.paraMap = paraMap;

    console.log('refreshParam', refreshParam);

    if (selectedRows.length !== indexRows.length && selectedRows.length !== 1) {
      console.log('kkkkkkkkkkkk');
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
                console.log('局部刷新dataList', dataList);
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
                // const editRows = response.data.dataList.filter((item) => item.indexCode);
                // indexRows.forEach((item) => {
                //   const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                //   const one = editRows.find((row) => row.indexCode === item.indexCode);
                //   const keys = Object.keys(one);
                //   keys.forEach((key) => {
                //     item[key] = one[key];
                //   });
                // });
                // this.changeState({
                //   dataSource: this.dataSource,
                // });
                // this.changeSelectedRows([], []);
              });
            });
          } catch (e) {
            MsgBox.error({ message: '反审核数据失败' });
          }
        },
      });
    } else if (
      selectedRows[0].paramType === 'ocp_indexParam' ||
      selectedRows[0].paramType === 'ocp_groupParam'
    ) {
      MsgBox.confirm({
        title: '反审核',
        content: '指标参数和分类参数记录不支持反审核操作，请在指标模式下进行反审核！',
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
                console.log('局部刷新dataList', dataList);
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
                // const editRows = response.data.dataList.filter((item) => item.indexCode);
                // indexRows.forEach((item) => {
                //   const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                //   const one = editRows.find((row) => row.indexCode === item.indexCode);
                //   const keys = Object.keys(one);
                //   keys.forEach((key) => {
                //     item[key] = one[key];
                //   });
                // });
                // this.changeState({
                //   dataSource: this.dataSource,
                // });
                // this.changeSelectedRows([], []);
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
