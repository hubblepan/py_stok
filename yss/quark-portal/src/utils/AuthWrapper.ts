import React from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

/**
 * 校验当前用户是否有功能编码对应的权限
 * @param {string} funcCode
 */
export function checkAuth(funcCode, operateCode) {
  if (funcCode) {
    let functionsList = AppContext.getRights(); // [{operateCode:0,btnCode:"add"},{operateCode:2,btnCode:"del"}]
    if (!functionsList) {
      return false;
    }

    // 这边有一个菜单ID-主要是为了兼容复用同一个组件情况
    // if (operateCode) {
    //   functionsList = functionsList.filter((item) => {
    //     return item.operateCode === operateCode;
    //   });
    // }

    // const functions = funcCode.split(',');
    // const flag = functions.some((value) =>
    //   functionsList.some((func) => func.buttonCode === value.trim()),
    // );
    const operList = functionsList[funcCode];
    if (!operList) {
      return false;
    }

    if(operList.indexOf(operateCode) === -1 ) {
      return false;
    }else {
      return true;
    }

    //return flag;
  }
  return false;
}

/**
 * 权限组件封装
 */
export default class AuthWrapper extends React.Component {
  render() {
    const { funcCode, operateCode, noMatch = null } = this.props;

    return checkAuth(funcCode, operateCode) ? this.props.children : noMatch;
  }
}

AuthWrapper.propTypes = {
  funcCode: PropTypes.string,
  operateCode: PropTypes.string,
};
