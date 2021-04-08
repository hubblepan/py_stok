export default [
  /* 上传多个升级包进行合并 */
  {
    path: '/monitor/version/upgrade/upload/multi/package',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },
  {
    path: '/monitor/version/upgrade/roll/back',
    method: 'post',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
      };
    },
  },

  /* 获取升级历史 */
  {
    path: '/monitor/version/upgrade/history/info',
    method: 'get',
    handle(data) {
      return {
        code: 'SUCCESS',
        msg: 'string',
        success: true,
        data: [
          {
            content: '升级内容，升级内容',
            operator: '潘浩波',
            time: '2020-11-20 11:20:20 222',
            versionName: '1.0.1',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
              {
                fileName: '23sdfasdf.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
              {
                fileName: 'asdfasdf.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
              {
                fileName: 'asdfasdfasdf.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
          {
            content: '升级内容2，升级内容2',
            operator: '潘浩波2',
            time: '2020-11-21 11:20:20 222',
            versionName: '1.0.2',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
          {
            content: '升级内容3，升级内容3',
            operator: '潘浩波3',
            time: '2020-11-22 11:20:20 222',
            versionName: '1.0.3',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
          {
            content: '升级内容4，升级内容4',
            operator: '潘浩波4',
            time: '2020-11-26 11:20:20 222',
            versionName: '1.0.2',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
          {
            content: '升级内容5，升级内容5',
            operator: '潘浩波5',
            time: '2020-11-29 11:20:20 222',
            versionName: '1.0.5',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
          {
            content: '升级内容5，升级内容5',
            operator: '潘浩波5',
            time: '2020-11-29 11:20:20 122',
            versionName: '1.0.5',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },

          {
            content: '升级内容5，升级内容5',
            operator: '潘浩波5',
            time: '2020-11-29 11:20:20 212',
            versionName: '1.0.5',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },

          {
            content: '升级内容5，升级内容5',
            operator: '潘浩波5',
            time: '2020-11-29 11:20:12 212',
            versionName: '1.0.5',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },

          {
            content: '升级内容5，升级内容5',
            operator: '潘浩波5',
            time: '2020-11-29 11:20:20 216',
            versionName: '1.0.5',
            upgradeFileVoList: [
              {
                fileName: '1.xls',
                downLoadUrl: 'https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe',
              },
            ],
          },
        ],
      };
    },

  },
];
