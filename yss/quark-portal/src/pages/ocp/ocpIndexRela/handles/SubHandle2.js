import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';
import SubService2 from '../service/SubService2';

export default class SubHandle extends BaseHandle {
  constructor(props) {
    const service = new SubService2();
    super({ service, ...props });
  }

  add() {
    this.setAddVisible(true);
  }

  async query(pageNo, pageSize) {
    if (!this.masterSelectedRows.length) {
      MsgBox.warning({ message: '请至少勾选一个分组！' });
      return;
    }
    const relaCode = this.masterSelectedRows
      .filter((item) => item.relaCodeP !== '[root]')
      .map((item) => item.relaCode);
    const relaRows = this.masterSelectedRows.filter((item) => item.relaCodeP !== '[root]');
    /** 1.拿参数 */
    const queryParam = {};
    const form = this.searchForm.getFieldsValue();
    form.N_CHECK_STATE = form.N_CHECK_STATE || 'SearchAll';
    /** 所有的指标代码 */
    form.ARRAY_INDEX_CODE_ALL = this.params.indexCode.join(',');
    /** B区勾选的指标代码 */
    form.ARRAY_INDEX_CODE = form.ARRAY_INDEX_CODE || this.params.indexCode.join(',');
    /** A区勾选的关联代码 */
    pageNo = pageNo || this.pageInfo.pageNo;
    pageSize = pageSize || this.pageInfo.pageSize;
    console.log('query');
    console.log(pageNo);
    console.log(pageSize);
    const pageRelaCode = relaCode.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    console.log('pageRelaCode');
    console.log(pageRelaCode.length);
    form.ARRAY_RELA_CODE = pageRelaCode.join(',');
    this.setPageInfo({
      ...this.pageInfo,
      pageTotal: relaCode.length,
      pageNo,
      pageSize,
    });
    /** 2个固定的字段 */
    form.dataClass = 'MonitorIndexInfo';
    form.PortMode = 'RelateMode';
    console.log('this.params');
    console.log(this.params);
    queryParam.paraMap = form;
    queryParam.dictIndexMap = {};
    const pageRelaRows = relaRows.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    pageRelaRows.forEach((item) => {
      queryParam.dictIndexMap[item.relaCode] = item.relaName;
    });
    console.log('queryParam');
    console.log(queryParam);

    /** 2.调接口 */
    this.setLoading(true);
    const response = await this.service.query(queryParam);
    this.setLoading(false);
    console.log('接口response');
    console.log(response);
    this.setDataSource(response?.data?.list);
    this.changeSelectedRows([],[])
  }

  check() {
    const { service, selectedRows } = this;
    // 把父结点排除掉
    const indexRows = selectedRows.filter((item) => item.indexCode && item.auditState === 0);
    const idList = [];
    const indexCodeList = [];
    indexRows.forEach((item) => {
      idList.push(item.id);
      indexCodeList.push(item.indexCode);
    });
    const params = {
      idList,
      indexCodeList,
    };

    const refreshParam = {};
    refreshParam.dataClass='MonitorIndexInfo'
    refreshParam.ids=idList.join(',')
    MsgBox.confirm({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.check(params).then(() => {
            // this.query();
            service.refresh(refreshParam).then((response) => {
              console.log(response);
              const editRows = response.data.dataList.filter((item) => item.indexCode);
              indexRows.forEach((item) => {
                const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                const one = editRows.find((row) => row.indexCode === item.indexCode);
                const keys = Object.keys(one);
                keys.forEach((key) => {
                  item[key] = one[key];
                });
              });
              this.changeState({
                dataSource: this.dataSource,
              });
              this.changeSelectedRows([], []);
            });
          });
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
  }

  uncheck() {
    const { service,selectedRows } = this;
    // 把父结点排除掉
    const indexRows = selectedRows.filter((item) => item.indexCode && item.auditState === 1);
    const idList = [];
    const indexCodeList = [];
    indexRows.forEach((item) => {
      idList.push(item.id);
      indexCodeList.push(item.indexCode);
    });
    const params = {
      idList,
      indexCodeList,
    };
    const refreshParam = {};
    refreshParam.dataClass='MonitorIndexInfo'
    refreshParam.ids=idList.join(',')
    MsgBox.confirm({
      title: '审核',
      content: '是否确定反审核已审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          service.uncheck(params).then(() => {
            // this.query();
            service.refresh(refreshParam).then((response) => {
              console.log(response);
              const editRows = response.data.dataList.filter((item) => item.indexCode);
              indexRows.forEach((item) => {
                const index = editRows.findIndex((row) => row.indexCode === item.indexCode);
                const one = editRows.find((row) => row.indexCode === item.indexCode);
                const keys = Object.keys(one);
                keys.forEach((key) => {
                  item[key] = one[key];
                });
              });
              this.changeState({
                dataSource: this.dataSource,
              });
              this.changeSelectedRows([], []);
            });
          });
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
  }

  deletes() {
    console.log('deletes');
    const { selectedRows } = this;
    const indexRows = selectedRows.filter((item) => item.indexCode && item.auditState === 0);
    MsgBox.confirm({
      title: '删除',
      content: '是否要将选中的记录执行删除操作?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.deletes(indexRows).then(() => {
            this.query();
          });
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
  }
}
