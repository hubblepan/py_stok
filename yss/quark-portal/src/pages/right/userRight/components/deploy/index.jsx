import { Modal, Row, Col, Steps, Button } from 'antd';
import QuarkModal from '@/components/QuarkModal';
import { useState, useEffect, useRef } from 'react';
import UploadTarget from './UploadTarget';
import BasicInfo from './BasicInfo';
import RelatedCombination from './RalatedCombination';
import ParamSetting from './ParamSetting';
import TargetTest from './TargetTest';
import DeployComplete from './DeployComplete';
import styles from '../style.less';
import request from '@/utils/request';
import * as deployService from './deployService';

console.log(deployService);

const { Step } = Steps;
const DeployModal = (props) => {
  const { testVisible, setTestVisible } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [footer, setFooter] = useState([
    <Button key="back">取消</Button>,
    <Button key="submit" type="primary">
      下一步
    </Button>,
  ]);

  // 状态储存仓库
  const [store, setStore] = useState({
    UploadTarget: { selectRows: [], tableData: [] },
    BasicInfo: { selectRows: [], tableData: [], dropdownData: {} },
    RelatedCombination: { selectRows: [], tableData: [], dropdownData: {} },
    ParamSetting: { selectRows: [], tableData: [] },
    TargetTest: { selectRows: [], tableData: [] },
    DeployComplete: { selectRows: [], tableData: [] },
  });

  const STEPS = [
    {
      title: '指标载入',
      handles: {},
    },
    {
      title: '基础信息',
      handles: {
        query: async () => {
          const res = await deployService.queryBasicInfo({
            id: store.UploadTarget.selectRows.map((row) => row.id).join(),
          });
          const _res = await deployService.getTriggerPositions();
          setStore({
            ...store,
            BasicInfo: {
              ...store.BasicInfo,
              msg: res.data.message,
              downloadUrl: res.data.downloadUrl,
              tableData: res.data.list,
              selectRows: [],
              dropdownData: {
                triggerPositions: _res.data,
              },
            },
          });
        },
      },
    },
    {
      title: '关联组合',
      handles: {
        query: async () => {
          const res = await deployService.queryCombination({});
          const _res = await deployService.queryCombinationMode();
          setStore({
            ...store,
            RelatedCombination: {
              ...store.RelatedCombination,
              msg: res.data.message,
              tableData: res.data.list,
              dropdownData: {
                combinationMode: _res.data,
              },
            },
          });
        },
      },
    },
    {
      title: '参数设置',
      handles: {
        query: async () => {
          const res = await deployService.queryParam({});
          setStore({
            ...store,
            ParamSetting: {
              tableData: res.data.list,
            },
          });
        },
      },
    },
    {
      title: '指标检测',
      handles: {
        query: async () => {
          const res = await deployService.queryTest({});
          setStore({
            ...store,
            TargetTest: {
              msg: res.data.message,
              tableData: res.data.list,
            },
          });
        },
      },
    },
    {
      title: '部署完成',
      handles: {
        query: async () => {
          const res = await deployService.queryComplete({});
          setStore({
            ...store,
            DeployComplete: {
              msg: res.data.message,
              tableData: res.data.list,
            },
          });
        },
      },
    },
  ];

  // 点击切换查询
  useEffect(() => {
    (async () => {
      console.log(STEPS[currentStep]);
      (await STEPS[currentStep].handles.query) && STEPS[currentStep].handles.query();
    })();
  }, [currentStep]);

  const onOk = () => {
    setTestVisible(false);
  };
  const onCancel = () => {
    setTestVisible(false);
  };
  const onAfterClose = () => {
    setCurrentStep(0);
  };
  const nextStep = () => {
    // console.log(store);
    if (currentStep < 5) {
      console.log(store);
      setCurrentStep(currentStep + 1);
    }
  };
  const backStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  useEffect(() => {
    switch (currentStep) {
      case 0:
        setFooter([
          <Button key="1" type="text" onClick={onCancel}>
            取消
          </Button>,
          <Button
            key="2"
            type="primary"
            disabled={store.UploadTarget.selectRows.length < 1} //未选中不可下一步
            onClick={nextStep}
          >
            下一步
          </Button>,
        ]);
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        setFooter([
          <Button key="1" type="text" onClick={onCancel}>
            取消
          </Button>,
          <Button key="2" type="primary" ghost onClick={backStep}>
            上一步
          </Button>,
          <Button key="3" type="primary" onClick={nextStep}>
            下一步
          </Button>,
        ]);
        break;
      case 5:
        setFooter([
          <Button key="3" type="primary" onClick={onCancel}>
            完成
          </Button>,
        ]);
        break;
      default:
        break;
    }
  }, [currentStep, store]);

  const steps = STEPS.map((x) => <Step key={x.title} title={x.title} />);
  return (
    <div>
      <QuarkModal
        title="指标检测"
        width={900}
        forceRender={true}
        destroyOnClose={true}
        afterClose={onAfterClose}
        visible={testVisible}
        footer={footer}
        onOk={onOk}
        onCancel={onCancel}
        className={styles.testModal}
      >
        <Row>
          <Col span={4} style={{ padding: '24px 0px 0px 24px' }} className={styles.leftSteps}>
            <Steps
              progressDot
              direction="vertical"
              size="small"
              current={currentStep}
              // onChange={(cur) => {
              //   console.log(cur);
              //   setCurrentStep(cur);
              // }}
            >
              {steps}
            </Steps>
          </Col>
          <Col span={20}>
            {/* 上传指标 */}
            <div className={currentStep === 0 ? 'show' : 'hidden'}>
              <UploadTarget store={store} setStore={setStore} />
            </div>
            {/* 基础信息 */}
            <div className={currentStep === 1 ? 'show' : 'hidden'}>
              <BasicInfo store={store} setStore={setStore} />
            </div>
            {/* 关联信息 */}
            <div className={currentStep === 2 ? 'show' : 'hidden'}>
              <RelatedCombination store={store} setStore={setStore} />
            </div>
            {/*  */}
            <div className={currentStep === 3 ? 'show' : 'hidden'}>
              <ParamSetting store={store} setStore={setStore} />
            </div>
            {currentStep === 4 ? (
              <div>
                <TargetTest store={store} setStore={setStore} />
              </div>
            ) : null}
            <div className={currentStep === 5 ? 'show' : 'hidden'}>
              <DeployComplete store={store} setStore={setStore} />
            </div>
          </Col>
        </Row>
      </QuarkModal>
    </div>
  );
};
export default DeployModal;
