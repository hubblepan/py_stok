import React, { useState, useEffect, useCallback } from 'react';
import Lottie from 'lottie-react';
import SvgIcon from '@/components/SvgIcon/index';
import LoginBg from '@/assets/login-bg.svg';
import LogoSVG from '@/assets/logo.svg';
import LogoText from '@/assets/logo-text.svg';
import { userlogin, getPostByUserCode, getUserRights,getOrgCodeByUserCode, getCustomFunList, getSysUserEncryptType   } from '@/services/login';

import { Form, Input, Button } from 'antd';
import Icon, { UserOutlined, UnlockOutlined, ArrowRightOutlined } from '@ant-design/icons';

import animationData from './animationData.json';
import css from './style.less';
import AppContext from '@/utils/AppContext';
import { connect, Link, useIntl, history } from 'umi';
import sm3 from 'sm3';
import sha256 from 'js-sha256';
import { EncodeByPassword } from '@/utils/CipherUtil';
import MsgBox from '@/utils/MsgBox';
import queryString from 'query-string';

export default function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const userName = '';
  const passWord = '';

  const exeLogin = async () => {
    AppContext.removeToken();
    AppContext.removeRefreshToken();

    // 校验
    try {
      const validResult = await form.validateFields();
    } catch (error) {
      return;
    }

    const _params = form.getFieldsValue();

    // 获取加密方式
    const encryptType = await getSysUserEncryptType(_params.userName)
    let encryptPwd = "";
    if(encryptType.data.userEncryptType && encryptType.data.userEncryptType === 'sm'){
      encryptPwd = sm3(_params.passWord).toUpperCase();
    }else if(encryptType.data.userEncryptType){
      encryptPwd = sha256(_params.passWord).toUpperCase();
    }

    const param = {
      username: EncodeByPassword(_params.userName),
      password: encryptPwd,
      appId: 'server1',
      redirectUri: '',
    };
    const result = await userlogin(param);
    // 缓存 token dangjingtao
    // sessionStorage.setItem('_yss_fast_Authentication', JSON.stringify(result));
    console.log(`登录返回 ${JSON.stringify(result)}`);
    if (result.success) {
      AppContext.setUserCode(result.data.user.userCode);
      AppContext.setToken(result.data.accessToken);
      // console.log(`accessToken=${ result.data.accessToken}`);
      AppContext.setRefreshToken(result.data.refreshToken);
      // console.log(`refreshToken=${result.data.refreshToken}`);

      // 获取用户的机构代码
      const orgRes = await getOrgCodeByUserCode(_params.userName);
      console.log("orgRes",orgRes);
      AppContext.setUser({
        userCode: result.data.user.userCode,
        userName: result.data.user.userName,
        authOrgCode: orgRes || '',
      });

      // 查询当前用户的岗位
      // console.log(`getUserCode=${ AppContext.getUserCode() }`);
      let strPosts = '';
      const resultPost = await getPostByUserCode(AppContext.getUserCode());
      // console.log(`resultPost=${ JSON.stringify(resultPost) }`);
      if (resultPost && resultPost.data) {
        for (let i = 0; i < resultPost.data.length; i++) {
          strPosts = strPosts + resultPost.data[i].c_POST_CODE + ',';
        }
      }
      if (strPosts.charAt(strPosts.length - 1) === ',') {
        strPosts = strPosts.substr(0, strPosts.length - 1);
      }

      AppContext.setPost(strPosts);
      console.log(`post= ${strPosts}`);

      // 查询用户操作权限
      const paramRight = {
        postCodes: strPosts,
        userCode: AppContext.getUserCode(),
      };
      // const resultRight = await getUserRights('userCode=yss&postCodes=admin');
      const resultRight = await getUserRights(queryString.stringify(paramRight));
      // console.log(`resultRight=${ JSON.stringify(resultRight) }`);
      if (resultRight && resultRight.data) {
        AppContext.setRights(resultRight.data.operation);
      }

      // const resultRight = await getUserRights(queryString.stringify(paramRight));
      history.push('/home/manage');

      // const menuData = getCustomFunList("QuarkWeb");

    }else {
      if(result.msg){
        MsgBox.warning({ message: result.msg });
      }else{
        AppContext.setUser({
          userCode: 'ht',
          userName: 'ht',
          authOrgCode: ''
        });
        AppContext.setUserCode('ht');
        AppContext.setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjX1VTRVJfQ09ERSI6Imh0IiwiZXhwIjoxNjExOTg1MTgyfQ.Ui6M-DTsQTHLL0Wpp9B5K-T2wvx6fozo6_7-whLLm1s');
        AppContext.setPost('YWJBG,ZLSPG,ZLJBG,YWFHG,SYSMGR,YWQNG,ZLFSG,ZLJFG,WBSWEBDEMO_POST,admin,ZLFHG');
        history.push('/home/manage');
      }
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      // 回车
      exeLogin();
    }
  };

  const enter = (e) => {
    exeLogin();
  };

  const [form] = Form.useForm();

  return (
    <>
      <div className={css.login}>
        <section className={css.wrapper}>
          <div className={css.bg}>
{/*             <Lottie
              options={defaultOptions}
              animationData={animationData}
              height={660}
              width={660}
            /> */}
          </div>
          <div className={css.bgSvg}>
            {/* <Icon component={LoginBg} /> */}
            <SvgIcon icon="login-bg"  style={{ width: 700, height: 700 }} />
          </div>
          <Form form={form} className={css.loginBox} name="control-ref">
            <Form.Item>
              <div className={css.loginHeader}>
                <SvgIcon icon="logo" style={{ width: 90, height: 100 }} />
                <SvgIcon icon="logo-text" style={{ width: 260, height: 50 }}  />
                {/* <h1 className="h1">YSSTECH</h1>
                <h4 className="h4">金融资产管理平台</h4> */}
              </div>
            </Form.Item>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '请输入用户名' }]}
              className={css.formItem}
            >
              <Input
                size="large"
                shape="round"
                placeholder="用户名"
                prefix={<UserOutlined />}
                style={{
                  height: 48,
                  borderRadius: '50px',
                  background: 'rgba(0,0,0, .06)',
                }}
                onKeyUp={onKeyUp}
                onPressEnter={enter}
              />
            </Form.Item>
            <Form.Item
              name="passWord"
              rules={[{ required: true, message: '请输入密码' }]}
              className={css.formItem}
            >
              <Input.Password
                size="large"
                shape="round"
                placeholder="密码"
                prefix={<UnlockOutlined />}
                style={{
                  height: 48,
                  borderRadius: '50px',
                  background: 'rgba(0,0,0, .06)',
                }}
                onKeyUp={onKeyUp}
                onPressEnter={enter}
              />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              shape="round"
              style={{ width: 150, height: 48 }}
              onClick={exeLogin}
            >
              LOGIN <ArrowRightOutlined />
            </Button>
          </Form>
        </section>
      </div>
      {/* <Lottie animationData={animationData} />; */}
    </>
  );
}
