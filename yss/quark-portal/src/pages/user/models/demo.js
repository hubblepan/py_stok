// 管控配置化指标
import baseModel from '@/components/TableView/baseModel';
import { Form } from 'antd';
export default () => {
  const [searchForm] = Form.useForm()
  return baseModel({
    // 额外状态
    searchForm,
    pageInfo: {
      pageNo: 1,
      pageSize: 20
    },
  });
};
