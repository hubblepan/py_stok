import React, {useEffect, useMemo} from 'react';
import { Modal} from 'antd';

const FormAddOrg = ({showAddOrg, setShowAddOrg}) => {
  useEffect(() => {

  });

  const handleOk = () => {
    setShowAddOrg(false);
  };

  const handleCancel = () => {
    setShowAddOrg(false);
  };

  return useMemo(() => {
    console.log('FormAddOrg 刷新');
    return (
      <Modal title="新增组织架构" visible={showAddOrg} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }, [showAddOrg]);
};

export default FormAddOrg
