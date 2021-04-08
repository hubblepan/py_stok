import BaseHandle from '@/handles/BaseHandle';
// import BaseService from '@/handles/BaseService';
import ChangeService from '../services/ChangeService';
import ButtonState from '@/components/TableView/ButtonState';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';
import moment from 'moment';



export default class ChangeHandle extends BaseHandle {
  constructor(props) {
    const service = new ChangeService({ base: '/ocp/indexinfo/changerecord' });
    super({ ...props, service });
  }


  add () {
    const selectedRow = JSON.parse(JSON.stringify(this.selectedRows[0]))

    // const init = {
    //   id: '',
    //   desc: null,
    //   modifyBy: null,
    //   modifyEndTime: null,
    //   modifyStartTime: null,
    //   modifyStoryBack: null
    // }

    this.form.setFieldsValue({
      ...selectedRow,
      // ...init
    })

    this.form.setFieldsValue({});
    this.changeState({
      operType: 'add',
      formVisible: true
    })
  }
  edit () {
    // 直接从记录行去数据,注意不要去直接修改引用  
    const selectedRow = JSON.parse(JSON.stringify(this.selectedRows[0]))

    selectedRow.modifyStartTime = moment(selectedRow.modifyStartTime, 'YYYY-MM-DD');
    selectedRow.modifyEndTime = moment(selectedRow.modifyEndTime, 'YYYY-MM-DD');

    this.changeState({
      operType: 'update',
      formVisible: true
    })
    // console.log('编辑', selectedRow)
    this.form.setFieldsValue(selectedRow)


  }
  copy () {
    // 直接从记录行去数据,注意不要去直接修改引用  
    const selectedRow = JSON.parse(JSON.stringify(this.selectedRows[0]))
    selectedRow.modifyStartTime = moment(selectedRow.modifyStartTime, 'YYYY-MM-DD');
    selectedRow.modifyEndTime = moment(selectedRow.modifyEndTime, 'YYYY-MM-DD');

    this.changeState({
      operType: 'copy',
      formVisible: true
    })

    this.form.setFieldsValue(selectedRow)

    // const primaryKey = this.selectedRowKeys;
    // this.getDetail(primaryKey, (res) => {
    //   delete res.data.id;
    //   this.form.setFieldsValue(res.data);
    //   this.changeState({
    //     operType: 'copy',
    //     formVisible: true
    //   })
    // });
  }

  async save ({ type }) {
    const validRes = await this.form.validateFields();
    if (validRes) {
      // 提交时再转一次moument对象
      const params = {
        ...validRes,
        modifyStartTime: moment(validRes.modifyStartTime).valueOf(),
        modifyEndTime: moment(validRes.modifyEndTime).valueOf()
      };

      if (type == 'copy') {
        type = 'add';
        delete params.id
      }

      // 此处需要判断，是新增还是保存
      const res = await this.service[type]([params]);

      if (res.success) {
        MsgBox.success({
          message: '保存成功'
        })
        this.closeDrawer();
        this.query();
      }
    } else {
      return false;
    }
  };

  closeDrawer () {
    this.changeState({
      formVisible: false
    })
    this.form.resetFields();
  }
  // 删除
  async deletes () {
    const selectedRows = this.selectedRows;

    MsgBox.confirmModal({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确定删除',
      type: 'danger',
      onOk: async () => {
        try {
          const deletesRes = await this.service.deletes(selectedRows);
          if (deletesRes.success) {
            MsgBox.success({
              message: '删除成功'
            })
            this.closeDrawer();
            this.query();
          }
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });

  }
  // 审核
  check ({ event, button }) {
    const selectedRows = this.selectedRows;
    MsgBox.confirmModal({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.check(selectedRows);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }
  // 反审
  uncheck ({ event, button }) {
    const selectedRows = this.selectedRows;
    MsgBox.confirmModal({
      title: '反审核',
      content: '是否确定反审核已审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.uncheck(selectedRows);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

}


