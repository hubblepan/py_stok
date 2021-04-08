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
import * as DeployService from './DeployService';
// import CombinationEcharts from '@/pages/home/manage/components/CombinationEcharts';

import fastConvert from '@/handles/fastConvert';

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
    // 这个是全局的属性。
    global: {
      selectedTargets: [],
    },
    // 载入
    UploadTarget: { selectRows: [], tableData: [] },
    // 基础信息
    BasicInfo: {
      selectRows: [],
      tableData: [],
      dropdownData: {},
      msg: { successInfo: { count: 0 }, faildInfo: { count: 0, msg: [] } },
    },
    // 关联模式
    RelatedCombination: {
      selectRows: [],
      tableData: [],
      dropdownData: {
        combinationType: [],
        combinationMode: [],
      },
    },
    ParamSetting: { selectRows: [], tableData: [], effectParamDicts: [] },
    TargetTest: { selectRows: [], tableData: [] },
    DeployComplete: { selectRows: [], tableData: [] },
  });

  // 第三步： 初始化关联组合
  const initRelatedCombination = async () => {
    // 新增安装，此时应执行保存操作
    const tableData = store.BasicInfo.selectRows;
    // console.log(444, tableData);
    const saveRes = await DeployService.saveTargets(tableData);
    const res = await DeployService.queryCombination({});

    // 过滤公共指标
    let newTableData = [];
    let publicData = [];
    tableData.forEach((x) => {
      if (x.isPublic == 0) {
        newTableData.push(x);
      } else {
        publicData.push(x);
      }
    });
    res.data.list = newTableData;

    // 然后保存公共指标
    const savePublicRes = await DeployService.saveRelationMode(publicData);
    if (savePublicRes.success) {
      console.log('保存公共指标成功');
    }

    // 查询指标模式单选框
    const typeRes = await DeployService.queryRelationType();

    setStore({
      ...store,
      RelatedCombination: {
        ...store.RelatedCombination,
        msg: res.data.message,
        tableData: res.data.list, // 此处需要分情况
        // selectRows: [],
        dropdownData: {
          combinationType: typeRes.data,
          // combinationMode: modeRes.data,
        },
      },
    });
  };

  // 第四步：初始化参数设置
  const initParamSetting = async () => {
    // 查询转换字典
    const effectParamDicts = (await DeployService.queryEffectParamDicts()).data;

    // 获取生效参数，请注意各种转换为扁平数据格式
    const params = [];
    store.RelatedCombination.selectRows.forEach((x) => {
      params.push({
        indexCode: x.indexCode, // 指标代码
        relaCode: '-', // 关联代码
        relaType: '-', // 关联类型
        auditState: 0, //对象默认值，不关心，默认是0，下同
      });

      // 然后，再判断这条记录的关联模式,将其扁平化
      if (x.relatedMode) {
        if (Array.isArray(x.relatedMode.selectedValues)) {
          x.relatedMode.selectedValues.forEach((y) => {
            params.push({
              indexCode: x.indexCode, // 指标代码
              relaCode: y, // 关联代码
              relaType: x.relatedMode.mode, // 关联类型
              auditState: 0, //对象默认值，不关心，默认是0，下同
            });
          });
        }
      }
    });
    const effectParams = await DeployService.queryEffectParams(params);
    let list = [];

    // 然后在此做数据转换，重新组装为树形结构。
    for (let i = 0; i < effectParams.length; i++) {
      // 判断父节点情况
      if (effectParams[i].relaCode === '-' && effectParams[i].relaType === '-') {
        for (let j = 0; j < effectParams.length; j++) {
          if (
            effectParams[j].relaCode !== '-' &&
            effectParams[j].relaType !== '-' &&
            effectParams[j].indexCode == effectParams[i].indexCode
          ) {
            effectParams[j].isLeaf = true;
            effectParams[i].children = effectParams[i].children ? effectParams[i].children : [];
            effectParams[i].children.push(effectParams[j]);
            // 删除数组中j编号的记录?
          }
        }
        list.push(effectParams[i]);
      }
    }

    // 再然后把上一步需要的数据拼接到原数组
    const rows = store.RelatedCombination.selectRows;
    list.forEach((x) => {
      rows.forEach((y) => {
        if (x.indexCode === y.indexCode) {
          x.indexAlias = y.indexAlias;
        }
      });
    });

    // const res = await DeployService.queryParam({});
    // console.log(res);

    setStore({
      ...store,
      ParamSetting: {
        tableData: list,
        effectParamDicts,
      },
    });
  };

  // 第五步：指标检测
  const initTest = async () => {
    // 把上一步的tableData转换之后，做检测。

    const result = await DeployService.testIndex(store.ParamSetting.tableData);
    console.log('第五步', result);
    const res = await DeployService.queryTest({});
    setStore({
      ...store,
      TargetTest: {
        msg: res.data.message,
        tableData: result,
      },
    });
  };

  const STEPS = [
    {
      title: '指标载入',
      handles: {},
    },
    {
      title: '基础信息',
      handles: {
        query: async () => {
          // 请求触发位置下拉框
          const _res = await DeployService.getTriggerPositions();
          // // 安装选中的指标
          const installRes = await DeployService.installTarget(store.UploadTarget.selectRows);
          let successInfo = {
            count: 0,
          };
          let faildInfo = {
            count: 0,
            msg: [],
          };

          for (let attr in installRes.data) {
            if (installRes.data[attr] == 1) {
              successInfo.count += 1;
            } else {
              faildInfo.count += 1;
              faildInfo.msg.push({
                name: attr,
                value: installRes.data[attr],
              });
            }
          }
          const res = {
            // ...__res,
            data: {
              // ...__res,
              list: _.cloneDeep(store.global.selectedTargets),
            },
          };

          // isPublic 1 公共指标 0
          // const tableData
          setStore({
            ...store,
            BasicInfo: {
              ...store.BasicInfo,
              msg: { successInfo, faildInfo },
              downloadUrl: res.data.downloadUrl,
              tableData: res.data.list,
              // selectRows: [],
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
        query: initRelatedCombination,
      },
    },
    {
      title: '参数设置',
      handles: {
        query: initParamSetting,
      },
    },
    {
      title: '指标检测',
      handles: {
        query: initTest,
      },
    },
    {
      title: '部署完成',
      handles: {
        query: async () => {
          const res = await DeployService.queryComplete({});
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
        setFooter([
          <Button key="1" type="text" onClick={onCancel}>
            取消
          </Button>,
          <Button key="2" type="primary" ghost onClick={backStep}>
            上一步
          </Button>,
          <Button
            key="3"
            type="primary"
            disabled={store.BasicInfo.selectRows.length < 1}
            onClick={nextStep}
          >
            下一步
          </Button>,
        ]);
        break;
      case 2:
        // console.log(111, store.RelatedCombination.selectRows);
        setFooter([
          <Button key="1" type="text" onClick={onCancel}>
            取消
          </Button>,
          <Button key="2" type="primary" ghost onClick={backStep}>
            上一步
          </Button>,
          <Button
            key="3"
            type="primary"
            disabled={store.RelatedCombination.selectRows.length < 1}
            onClick={nextStep}
          >
            下一步
          </Button>,
        ]);
        break;
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
        title="部署弹窗"
        width={900}
        forceRender={true}
        destroyOnClose={true}
        afterClose={onAfterClose}
        visible={testVisible}
        footer={footer}
        onOk={onOk}
        onCancel={onCancel}
        className={styles.detectionModal}
        bodyStyle={{ padding: 0 }}
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
            {/* 参数设置 */}
            <div className={currentStep === 3 ? 'show' : 'hidden'}>
              <ParamSetting store={store} setStore={setStore} />
            </div>

            <div className={currentStep === 4 ? 'show' : 'hidden'}>
              <TargetTest store={store} setStore={setStore} />
            </div>

            {/* {currentStep === 4 ? (
              <div>
                <TargetTest store={store} setStore={setStore} />
              </div>
            ) : null} */}
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
