import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import MsgBox from '@/utils/MsgBox';


export default class TargetSettingSubHandle extends BaseHandle {
  constructor(model) {
    const service = new BaseService({ base: '/api/mainScheme' });
    super({ ...model, service });
  }

  getButtonState (button) {
    const method = this.buttonState[button.id];
    return method && method.call(this.buttonState, detailData);
  }

  edit () {
    this.setFormStatus(1);
  }

  copy () {
    this.setFormStatus(2);
  }

  async deletes ({ event, button, currentRow }) {
    MsgBox.confirm({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await this.service.deletes([this.detailData.id]);
          MsgBox.success({
            message: '删除成功'
          })
          this.setViewDetail(false);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
          console.log(e)
        }
      },
    });
  }

  check ({ event, button }) {
    MsgBox.confirm({
      title: '审核',
      content: '是否确定审核未审核的记录',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.check([this.detailData.id]);
          this.setViewDetail(false);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }

  uncheck ({ event, button }) {
    MsgBox.confirm({
      title: '反审核',
      content: '是否确定反审核已审核的记录',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.uncheck([this.detailData.id]);
          this.setViewDetail(false);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

}

