// 主表编辑modal
import QuarkModal from '@/components/QuarkModal';
import DForm from './DForm';

export default (props) => {
  const { visible, setVisible, masterRowEditData, setMasterRowEditData } = props;
  return visible ? (
    <QuarkModal
      bodyStyle={{
        width: 440,
        height: 200,
      }}
      width={500}
      title="修改分类"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <DForm
        visible={visible}
        setVisible={setVisible}
        masterRowEditData={masterRowEditData}
        setMasterRowEditData={setMasterRowEditData}
      />
    </QuarkModal>
  ) : null;
};
