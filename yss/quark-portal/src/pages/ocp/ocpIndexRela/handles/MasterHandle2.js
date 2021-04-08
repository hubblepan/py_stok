import BaseHandle from '@/handles/BaseHandle';
import MsgBox from '@/utils/MsgBox';
import MasterHandleCorrelation from '../service/MasterHandleCorrelation';

export default class MasterHandle extends BaseHandle {
  constructor(props) {
    const service = new MasterHandleCorrelation();

    super({ service, ...props });
  }

  refresh() {
    this.query();
  }

  diyClassifyAdmin() {
    this.setDiyVisible(true);
  }

  checkGroup() {
    this.service
      .checkGroup()
      .then((response) => {
        /** 注意：后端传过来的是字符串true和false。'true'&'false'。所以要JSON.parse一下 */
        if (JSON.parse(response.data)) {
          this.diyClassifyAdmin();
        } else {
          this.confirmShortNum();
        }
      })
      .catch(() => {});
  }

  confirmShortNum() {
    MsgBox.confirm({
      title: '确认',
      content: '需要将短编码导入到自定义分类吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await this.service.createCustomClassify();
          if (JSON.parse(response.data)) {
            await this.service.exportShortNum();
          }
        } catch (e) {}

        this.diyClassifyAdmin();
      },
      onCancle: () => {
        this.diyClassifyAdmin();
      },
    });
  }
}
