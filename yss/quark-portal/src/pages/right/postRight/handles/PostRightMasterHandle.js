import ButtonState from '@/components/TableView/ButtonState';
import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import PostRightService from '../service/PostRightService';

export default class PostRightMasterHandle extends BaseHandle {
  constructor(model) {
    //const service = new BaseService({ base: '/ocp/targetSetting/targetTree' });
    const service = new PostRightService({ base: '/api/postRight' });
    const buttonState = new ButtonState();

    super({ service, buttonState, ...model });
  }

  async query() {
    function convertList(listData) {
      const treeList = [];
      if (listData && listData.length > 0) {
        listData.forEach(item => {
          item.id = item.c_POST_CODE;
          item.key = item.c_POST_CODE;
          item.typeCode = item.c_POST_CODE;
          item.typeName = item.c_POST_NAME;
          item.isLeaf = true;
          item.isShow = true;
          item.typeP = "";
          treeList.push(item);
        });
      }
      return treeList;
    }
    this.setLoading(true);
    const result = await this.service.getAllPost();
    let treeData = convertList(result.data.dataList);
    this.changeResult({dataSource: treeData});
  }
}


