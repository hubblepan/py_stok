import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import request from '@/utils/request';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import MsgBox from '@/utils/MsgBox';
import SubService from '../services/TargetSubService';

// 操作列方法提取
const handleOperateRow = (
  { rows, key, url, msg, title, type, okText, cancelText, extraFooter },
  callback,
) => {
  // 自定义方法应拿到选中行数据
  const params = {};
  if (Array.isArray(rows)) {
    params[key] = rows.map((row) => row[key]);
  } else {
    params[key] = rows[key];
  }

  MsgBox.confirmModal({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: msg,
    type,
    okText,
    cancelText,
    extraFooter,
    // footer: null,
    onOk: () => {
      request
        .post(url, {
          params,
        })
        .then((res) => {
          MsgBox.success({
            message: '操作成功！',
          });
          // 刷新子表，如无必选项则清空
          callback && callback();
        });
    },
  });
};

export default class SubHandle extends BaseHandle {
  constructor(props) {
    const service = new SubService();

    super({ ...props, service });
  }

  async edit (...args) {
    this.changeState({
      formVisible: true,
      // formData: data,
      modalOperate: 'edit',
      currentRecord: this.selectedRows[0],
    });
  }

  test (...args) {
    this.changeState({
      testVisible: true,
    });
  }

  permitConfig (...args) {
    this.changeState({
      permission: true,
    });
  }

  deploy (...args) {
    this.changeState({
      deployVisible: true,
    });
    // console.log(this.changeState);
  }

  unload () {
    let { selectedRows } = this;
    // 如果包含已审核（check为1）的数据，则不传 ,已审核不能卸载
    selectedRows = selectedRows
      .map((row) => (row.checkState == 1 ? null : row))
      .filter((row) => !!row);

    // 卸载参数
    const params = {
      monitorIndexList: selectedRows,
    };


    const unload = (params, isDelete) => {
      params = {
        ...params,
        delFlag: isDelete
      }
      request(this.service.url.unload, {
        method: 'post',
        data: params,
      }).then((res) => {
        console.log('卸载', res)
        MsgBox.success({
          message: '卸载成功！',
        });
        this.query();
      });
    }

    MsgBox.confirmModal({
      title: '卸载',
      icon: <ExclamationCircleOutlined />,
      content: '卸载指标的同时是否删除指标的相关绑定信息？',
      okText: '是',
      // cancelText,
      extraFooter: [
        <Button order={2} onClick={() => { unload(params, false); return true }} key="more" type="default">
          否
          </Button>,
      ],
      onOk: () => unload(params, true),
    });
  }

  // 针对行数据进行单独操作的方法
  formHandles () {
    return {
      unload: (selectRow, callback) => {
        console.log(callback);
        handleOperateRow(
          {
            rows: selectRow,
            key: 'indexCode',
            url: '/ocp/monitor/index/unload',
            msg: '是否确定卸载该的指标？',
          },
          callback,
        );
      },
      check: (selectRow, callback) => {
        handleOperateRow(
          {
            rows: selectRow,
            key: 'indexCode',
            url: '/ocp/monitor/index/check',
            msg: '是否确定审核该指标？',
          },
          callback,
        );
      },
      uncheck: (selectRow, callback) => {
        handleOperateRow(
          {
            rows: selectRow,
            key: 'indexCode',
            url: '/ocp/monitor/index/uncheck',
            msg: '是否确定反审核该指标？',
          },
          callback,
        );
      },
    };
  }

  check () {
    const rows = this.selectedRows.filter((item) => item.auditState === 0);
    MsgBox.confirmModal({
      title: '审核',
      content: '是否要将选中的记录执行审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.check(rows);
          MsgBox.success({
            message: '审核成功！',
          });
          this.query();
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
  }

  uncheck () {
    const rows = this.selectedRows.filter((item) => item.auditState === 1);
    MsgBox.confirmModal({
      title: '反审核',
      content: '是否要将选中的记录执行反审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.uncheck(rows);
          MsgBox.success({
            message: '反审核成功！',
          });
          this.query();
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
  }

  async download () {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const res = await this.service.download(this.selectedRows[i]);

        // type 为需要导出的文件类型，此处为xls表格类型
        const blob = new Blob([res.message], { type: 'application/jar' })
        // 兼容不同浏览器的URL对象
        const url = window.URL || window.webkitURL || window.moxURL
        // 创建下载链接
        const downloadHref = url.createObjectURL(blob)
        window.open(downloadHref)

        if (res.success) {
          // // type 为需要导出的文件类型，此处为xls表格类型
          // const blob = new Blob([res.data], { type: 'application/jar' })
          // // 兼容不同浏览器的URL对象
          // const url = window.URL || window.webkitURL || window.moxURL
          // // 创建下载链接
          // const downloadHref = url.createObjectURL(blob)
          // window.open(downloadHref);
          // MsgBox.success({
          //   message: '下载成功！',
          // });
        } else {
          MsgBox.error({ message: this.selectedRows[i].indexCode + '指标下载失败' });
        }
      }
    } catch (err) {
      console.log('下载错误', err)
    }
  }
}


