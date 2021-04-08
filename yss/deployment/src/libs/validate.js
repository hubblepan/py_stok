/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 校验是否为文件路径
 * @param str
 * @returns {boolean}
 */
export function isFileDir(str) {
  const reg = /^[a-zA-Z]:(\\([0-9a-zA-Z._-]+))+|(\/([0-9a-zA-Z._-]+))+$/;
  return reg.test(str);
}

/**
 * 校验是否为zip文件路径
 * @param str
 * @returns {boolean}
 */
export function isZipFile(str) {
  const reg = /^([a-zA-Z]:(\\([0-9a-zA-Z._-]+))+|(\/([0-9a-zA-Z._-]+))+)\.zip$/;
  return reg.test(str);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  let validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 新增返回单个正则系列 命名xxxExp
 * djtao
 */

/**
 * win & linux 目录
 * 1.  支持相对路径，
 * 2. 斜杠不管方向
 * 3. 支持中文，不支持特殊字符
 * （目前暂时不支持）
 */
export function cateExp () {
  return {
    // exp: /(^[a-zA-Z]:(\/[^\//<>|:*?"]+)+\/)|((\/[^\//<>|:*?"]+)+\/)/,
    // exp: /(^[a-zA-Z]:(\/[^\//<>|:*?"]))|((?:\w+\\)*\w+\.\w+$)/,
    exp: /[a-zA-Z]:(\\([0-9a-zA-Z]+))+|(\/([0-9a-zA-Z]+))+/,
    msg: '请输入正确的文件路径',
  };
}

/**
 * 英文或数字
 */
export function enCnExp () {
  return {
    exp: /^[0-9a-zA-Z]+$/,
    msg: '只能输入英文或数字或其组合',
  };
}

/**
 * 端口号
 */
export function portExp () {
  return {
    exp: /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    msg: '请输入正确的端口号（1-65535）',
  };
}

/**
 * 端口号
 */
export function ipExp () {
  return {
    exp: /^([1-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))(\.([0-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))){3}$/,
    msg: '数据库IP格式有误',
  };
}

/**
 * 地址格式验证（xxx.xxx.xxx.xxx 格式）
 * @returns {{msg: string, exp: RegExp}}
 */
export function domainExp() {
  return {
    exp: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/,
    msg: '地址格式有误',
  };
}
/**
 * 正整数 和 0
 */

export function isNum () {
  return {
    exp: /^[0-4]{1}(\.[0-4])?$/,
    msg: '请输入正确的数字',
  };
}

export function memorySize (rule, value, callback) {
  var reg = /^\d+(\.{0,1}\d+){0,1}$/;
  if (!(reg.test(value))) {
    callback(new Error('请输入数字'));
    return false;
  } else {
    if (value < 4) {
      callback(new Error('内存不能小于4G'));
      return false;
    } if (value > 100) {
      callback(new Error('内存不能大于100G'));
      return false;
    } else {
      callback();
    }
  }
}

export function isNotEmpty(rule, value, callback) {
  if (!value || !value.trim()) {
    callback(new Error('输入不可以为空'));
    return false;
  }
  callback();
}

export function containFile(rule, fileList, callback) {
  if (!fileList || fileList.length <= 0) {
    callback(new Error('输入不可以为空'));
    return false;
  }
  callback();
}

export function isInteger(rule, value, callback) {
  if (!value) {
    callback(new Error('输入不可以为空'));
    return false;
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
      return false;
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
        return false;
      } else {
        callback();
      }
    }
  }, 0);
}

// 支持 ip , 域名 ， localhost
export function tomcatIP(rule, value, callback) {
  var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  var regDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  if (!(regIp.test(value)) && !(regDomain.test(value)) && value !== 'localhost') {
    callback(new Error('请输入正确ip，域名或者localhost'));
    return false;
  } else {
    callback();
  }
}

// ip + host
export function validIpPort(rule, value, callback) {
  let regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  let regDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  let regPort = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  let msg = '请输入正确的ip:port地址';
  let ipPort = value.split(':');
  if (ipPort.length !== 2) {
    callback(new Error(msg));
  }
  let ip = ipPort[0];
  let port = ipPort[1];
  if (!(regIp.test(ip)) && !(regDomain.test(ip)) && ip !== 'localhost') {
    callback(new Error(msg));
  } else if (!regPort.test(port)) {
    callback(new Error(msg));
  } else {
    callback();
  }
}

export function validCluster(rule, value, callback) {
  let pattern = /\d+\.\d+\.\d+\.\d+:\d+/;
  let msg = '请输入正确的包含ip:port地址';
  if (!pattern.test(value)) {
    callback(new Error(msg));
  } else {
    callback();
  }
}
