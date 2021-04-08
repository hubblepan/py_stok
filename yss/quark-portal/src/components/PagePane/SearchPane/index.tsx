import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
  memo,
} from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Form, Row, Col, Dropdown } from 'antd';

const SearchPane = ({
  formItems = [],
  colsNumber = 4,
  labelWidth = 80,
  searchRender,
  setSearchForm,
  onResize,
  handles,
}) => {
  // console.log('SearchPane==');

  if (searchRender) {
    return searchRender(formItems, colsNumber, labelWidth);
  }
  const labelFlexStyle = labelWidth === 'auto' ? null : `0 0 ${labelWidth}px`;

  const [collapsed, setCollapsed] = useState(true);

  const resetButton = () => {
    searchForm.resetFields();
  };
  if (!formItems || formItems.length === 0) {
    return null;
  }
  // 实例化form
  const [searchForm] = Form.useForm();
  useEffect(() => {
    setSearchForm(searchForm);
  }, []);

  // 计算各个搜索条件所占的宽 & 展开|收起
  const length = formItems.length;
  const spanSize = Number.parseInt(24 / colsNumber);
  let searchOffset = (colsNumber - (length % colsNumber) - 1) * spanSize;
  if (length > colsNumber - 1 && collapsed) {
    searchOffset = 0;
  }
  const collapseForm = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
    setTimeout(onResize, 100);
  };

  return (
    <Form form={searchForm} layout="inline" className="px-2">
      {length > 0 && (
        <Row gutter={[0, 16]} style={{ width: '100%', margin: 0 }}>
          {formItems.map((component, index) => {
            return (
              <Col
                span={spanSize}
                className={index >= colsNumber - 1 && collapsed ? 'hidden' : 'show'}
                key={index}
              >
                <Form.Item
                  label={component.props.label}
                  name={component.props.name}
                  key={index}
                  labelCol={{
                    flex: labelFlexStyle,
                  }}
                >
                  {component}
                </Form.Item>
              </Col>
            );
          })}
          <Col span={spanSize} offset={searchOffset} className="text-end pr-4">
            <Button style={{ border: '1px solid #D9D9D9' }} onClick={resetButton}>
              重置
            </Button>
            <Button
              onClick={(e) => {
                // handles.query.call(handles, e);
                handles.query.call(handles);
              }}
              type="primary"
            >
              查询
            </Button>
            {length > colsNumber - 1 ? (
              <Dropdown overlay={<></>} className={'ml-2'}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => {
                    collapseForm(e);
                  }}
                >
                  {collapsed ? '展开' : '收起'}
                  <DownOutlined
                    style={{
                      transition: 'all 0.3s ease',
                      transform: !collapsed ? 'rotate(180deg)' : '',
                    }}
                  />
                </a>
              </Dropdown>
            ) : null}
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default React.memo(SearchPane);
