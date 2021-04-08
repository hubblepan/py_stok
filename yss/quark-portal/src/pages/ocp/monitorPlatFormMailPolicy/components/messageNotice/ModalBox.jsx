import React, { useState } from 'react';
import { Form, Steps, Button, Row, Col } from 'antd';
import QuarkModal from '@/components/QuarkModal';
import styles from './style.less';
import NoticeContent from './components/NoticeContent';
import PolicyConfig from './components/PolicyConfig';
import SchemeConfirm from './components/SchemeConfirm';

const ModalBox = (props) => {
  const { formVisible, setFormVisible, handles, operate, formData } = props;
  let title = operate === 'add' ? '新增' : '修改';

  const [form] = Form.useForm();
  const { Step } = Steps;

  const [step, setStep] = useState(0);

  const onCancel = () => {
    setFormVisible(false);
  };
  const nextStep = () => {
    switch (step) {
      case 0:
        setStep(step + 1);
        break;
      case 1:
        setStep(step + 1);
        break;
      default:
        break;
    }
  };
  const backStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // 保存数据
  const saveHandle = async () => {
    // const values = await form.validateFields();
    // let exValue = [];
    // exValue = { ...values, checkState: Math.random() > 0.5 ? 1 : 0, id: formData.id };
    // handles.save(exValue);
    setFormVisible(false);
    // form.resetFields();
  };

  return (
    <>
      <QuarkModal
        title={title}
        visible={formVisible}
        // bodyStyle={{
        //   maxHeight: '600px',
        //   overflowY: 'auto',
        // }}
        width={900}
        onOk={saveHandle}
        onCancel={onCancel}
        className={styles.mailModal}
        footer={
          <>
            <Button type="text" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" ghost onClick={backStep} className={step > 0 ? '' : 'hidden'}>
              上一步
            </Button>
            <Button type="primary" onClick={nextStep} className={step < 2 ? '' : 'hidden'}>
              下一步
            </Button>
            <Button type="primary" onClick={onCancel} className={step === 2 ? '' : 'hidden'}>
              完成并关闭
            </Button>
          </>
        }
      >
        <Row>
          <Col span={4} style={{ padding: '24px 0px 0px 24px' }} className={styles.leftSteps}>
            <Steps progressDot direction="vertical" size="small" current={step}>
              <Step title="策略配置" />
              <Step title="通知内容" />
              <Step title="方案确认" />
            </Steps>
          </Col>
          <Col span={20}>
            <div className={step === 0 ? 'show' : 'hidden'}>
              <PolicyConfig />
            </div>
            <div className={step === 1 ? 'show' : 'hidden'}>
              <NoticeContent />
            </div>
            <div className={step === 2 ? 'show' : 'hidden'}>
              <SchemeConfirm />
            </div>
          </Col>
        </Row>
      </QuarkModal>
    </>
  );
};

export default ModalBox;
