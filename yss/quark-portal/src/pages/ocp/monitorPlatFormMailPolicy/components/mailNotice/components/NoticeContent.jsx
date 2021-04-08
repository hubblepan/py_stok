import React, { useEffect, useState } from 'react';
// import E from 'wangeditor';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Input, Row, Col } from 'antd';
import QuarkModal from '@/components/QuarkModal/index';
import QuarkTable from '@/components/QuarkTable';
import SvgIcon from '@/components/SvgIcon/index';
import styles from './style.less';

// let editor = null;
const NoticeContent = () => {
  const [form] = Form.useForm();

  /**
   * wangeditor编辑器
   */

  // useEffect(() => {
  //   // 注：class写法需要在componentDidMount 创建编辑器
  //   editor = new E('#div1');

  //   /** 一定要创建 */
  //   editor.create();

  //   return () => {
  //     // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
  //     editor.destroy();
  //   };
  // }, []);

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  const [questionVisible, setQuestionVisible] = useState(false);

  const questionHandle = () => {
    setQuestionVisible(true);
  };

  const handleOk = () => {
    setQuestionVisible(false);
  };

  const handleCancel = () => {
    setQuestionVisible(false);
  };

  const data = [
    {
      id: '1',
      keyWord: '日期',
      characterCode: '日期',
    },
    {
      id: '11',
      keyWord: '日期',
      characterCode: '日期格式',
    },
    {
      id: '2',
      keyWord: '组合',
      characterCode: '组合代码',
    },
    {
      id: '21',
      keyWord: '组合',
      characterCode: '组合名称',
    },
    {
      id: '3',
      keyWord: '证券',
      characterCode: '证券代码',
    },
    {
      id: '31',
      keyWord: '证券',
      characterCode: '证券名称',
    },
  ];

  const columns = [
    {
      id: 'k1',
      title: '关键词',
      dataIndex: 'keyWord',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = 2;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.rowSpan = 2;
        }
        if (index === 5) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      id: 'k2',
      title: '字符代码',
      dataIndex: 'characterCode',
    },
  ];

  return (
    <>
      <div className={styles.panel}>
        <Form colon={false} labelCol={8} form={form} name="basic">
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="发件人"
                name="sender"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="收件人"
                name="sender"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <Input disabled />
                <span>
                  <a href="#">添加抄送人</a> | <a href="#">添加密送人</a>
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="主&nbsp;&nbsp;&nbsp;&nbsp;题"
                name="theme"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input disabled />
                  <div onClick={questionHandle}>
                    <SvgIcon icon="question" style={{ fontSize: '20px' }} />
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                style={styles.itemModal}
                label="内&nbsp;&nbsp;&nbsp;&nbsp;容"
                name="content"
                rules={[{ required: true, message: '请输入内容!' }]}
              >
                {/* <div id="div1"><p>内容显示区域kkkkkkkk</p></div> */}

                <Editor
                  // initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    height: 300,
                    menubar: false,
                    branding: false, // 隐藏富文本编辑器组件的商标消息” Powered by TinyMCE”
                    language: 'zh_CN',
                    forced_root_block: '',
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount emoticons',
                    ],

                    toolbar:
                      'undo redo | formatselect | fontselect | fontsizeselect | selectall | newdocument | underline | strikethrough | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify alignnone | \
             bullist numlist outdent indent | styleselect | removeformat | link | fullscreen | print | media | image | quicklink | \
             cut | copy |paste | subscript | superscript | visualaid | insert | code | table | help ',
                  }}
                  onEditorChange={handleEditorChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <QuarkModal
          title="字符代码"
          visible={questionVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          bodyStyle={{ height: '300px', padding: '0', margin: '0' }}
          footer={false}
          fullScreen={false}
        >
          <QuarkTable columns={columns} dataSource={data} rowSelection={false} rowKey="id" />
        </QuarkModal>
      </div>
    </>
  );
};

export default NoticeContent;
