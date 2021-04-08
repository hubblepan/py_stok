import BaseHandle from '@/handles/BaseHandle';
import SubService from '../services/TargetSettingSubService';
import BeanUtil from '@/utils/BeanUtil';
import MsgBox from '@/utils/MsgBox';

export default class TargetSettingSubHandle extends BaseHandle {
  constructor(model) {
    // const service = new BaseService({ base: '/ocp/targetSetting/' });
    const service = new SubService();
    super({ ...model, service });
  }

  async queryBefore (params) {
    let masterParams = null;
    if (this.masterSelectedRows) {
      if (this.masterSelectedRows.length === 0) {
        MsgBox.warning({ message: '请至少选择一条主表数据' });
        return false;
      }
      const primaryKeys = this.masterSelectedRows.map((x) => x['C_INDEX_CODE']).join(',');

      console.log('主表参数', masterParams);
      masterParams = { 'C_INDEX_CODE': primaryKeys };
    }

    // 处理
    let searchValue = await this.searchForm.getFieldsValue();
    const _searchValue = { 'C_TOPIC_CODE': [], 'C_TOPIC_VER': [], 'C_MONITOR_TYPE': [] }
    if (searchValue.dataTheme) {
      searchValue.dataTheme.forEach(item => {
        // console.log(item)
        const [id, version, code] = item.split('|')
        _searchValue['C_TOPIC_CODE'].push(code);
        _searchValue['C_TOPIC_VER'].push(version);

      });
    }


    if (searchValue.monitorType) {
      searchValue.monitorType.forEach(item => {
        // console.log(item)
        const [id, version, code] = item.split('|')
        _searchValue['C_MONITOR_TYPE'].push(code);
      });
    }

    _searchValue['C_TOPIC_CODE'] = _searchValue['C_TOPIC_CODE'].join('|')
    _searchValue['C_TOPIC_VER'] = _searchValue['C_TOPIC_VER'].join('|')
    _searchValue['C_MONITOR_TYPE'] = _searchValue['C_MONITOR_TYPE'].join('|')

    searchValue = BeanUtil.merge(searchValue, _searchValue)
    // console.log('真实参数', {
    //   ...masterParams,
    //   ...searchValue,
    //   // ...params,
    //   // ...this.params
    // })

    const queryParams = {
      ...masterParams,
      ..._searchValue,
      // ...params,
      // ...this.params
    };

    return queryParams;
  }


  add () {
    this.setMode('add');
    this.setAddModalVisible(true);
  }

  edit () {
    const { selectedRows } = this;
    this.setMode('edit');
    this.setCurrentRecord(selectedRows[0]);
    this.setAddModalVisible(true);
  }

  copy () {
    this.setMode('copy');
    this.setAddModalVisible(true);
  }

  deploy () {
    this.setDeployModalVisible(true);
  }

}


