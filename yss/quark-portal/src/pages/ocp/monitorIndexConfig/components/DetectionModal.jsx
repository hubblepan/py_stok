import { Modal, Row, Col, Steps, Button, Divider, message } from 'antd';
import { useState, useEffect, createContext, useRef } from 'react';
import MsgBox from '@/utils/MsgBox';
import TargetTable from './detection/TargetTable';
import CombinationTable from './detection/CombinationTable';
import styles from './style.less';
import DetectionTable from './detection/DetectionTable';
import QuarkModal from '@/components/QuarkModal';
const { Step } = Steps;
// const AppContext = createContext({});
const DetectionModal = (props) => {
  const { testVisible, setTestVisible } = props;
  const [step, setStep] = useState(0);
  const [idtarget, setIdtarget] = useState('');
  const [idcombination, setIdcombination] = useState('');
  const [idcombLen, setIdcombLen] = useState(0);
  const [idtargetLen, setIdtargetLen] = useState(0);

  const onOk = () => {
    setTestVisible(false);
  };
  const onCancel = () => {
    setTestVisible(false);
  };
  const onAfterClose = () => {
    setStep(0);
  };
  const nextStep = () => {
    switch (step) {
      case 0:
        if (!idtarget) {
          MsgBox.info({ content: '请选择指标' });
        } else {
          setStep(step + 1);
        }
        break;
      case 1:
        if (!idcombination) {
          MsgBox.info({ content: '请选择组合' });
        } else {
          setStep(step + 1);
        }
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
  useEffect(() => {
    if (!testVisible) {
      setStep(0);
      setIdtarget('');
      setIdcombination('');
    }
  }, [testVisible]);
  useEffect(() => {
    const len = idtarget ? idtarget.split(',').length : 0;
    setIdtargetLen(len);
    // 设置步骤条
    console.log('idtarget');
    console.log(idtarget);
  }, [idtarget]);
  useEffect(() => {
    const len = idcombination ? idcombination.split(',').length : 0;
    console.log('idcombination');
    console.log(idcombination);
    console.log(len);
    setIdcombLen(len);
  }, [idcombination]);
  return (
    <Modal
      title="指标检测"
      width={900}
      bodyStyle={{ height: '560px', padding: '0px' }}
      afterClose={onAfterClose}
      visible={testVisible}
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
      onOk={onOk}
      onCancel={onCancel}
      className={styles.detectionModal}
    >
      <Row>
        <Col span={4} style={{ padding: '24px 0px 0px 24px' }} className={styles.leftSteps}>
          <Steps progressDot direction="vertical" size="small" current={step}>
            <Step
              title="选择指标"
              description={
                <div style={{ height: '22px' }}>
                  {idtargetLen ? (
                    <div style={{ height: '22px' }}>
                      <span className="text-secondary">已选</span>
                      <span className="text-primary mx-1">{idtargetLen}</span>
                      <span className="text-secondary">项</span>
                    </div>
                  ) : null}
                </div>
              }
            />
            <Step
              title="选择组合"
              description={
                <div style={{ height: '22px' }}>
                  {idcombLen ? (
                    <div style={{ height: '22px' }}>
                      <span className="text-secondary">已选</span>
                      <span className="text-primary mx-1">{idcombLen}</span>
                      <span className="text-secondary">项</span>
                    </div>
                  ) : null}
                </div>
              }
            />
            <Step title="检测执行" />
          </Steps>
        </Col>
        <Col span={20}>
          {/**
           * 1.注意：这种方法会重新渲染，但是现在我不希望它重新渲染
           * {step===0 ? (<TargetTable testVisible={testVisible} />):null}
           * 2.需要在组件外包一层div，再用style或className，否则无效。（或者在组件里面做）
           */}
          <div className={step === 0 ? 'show' : 'hidden'}>
            <TargetTable setIdtarget={setIdtarget} testVisible={testVisible} />
          </div>
          <div className={step === 1 ? 'show' : 'hidden'}>
            <CombinationTable setIdcombination={setIdcombination} testVisible={testVisible} />
          </div>
          <div className={step === 2 ? 'show' : 'hidden'}>
            <DetectionTable
              idtarget={idtarget}
              idcombination={idcombination}
              testVisible={testVisible}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
export default DetectionModal;
