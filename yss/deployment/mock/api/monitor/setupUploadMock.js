export default [
  // 服务器管理
  // 查询服务器列表
  {
    path: '/setup/tomcatInfo',
    method: 'get',
    handle(data) {
      console.log(data);
      return {
        code: 'SUCCESS',
        data: [{
          deployStatus: 'deploying',
          tomcatDir: '/usr/local/tomcat8',
          tomcatName: 'tomcat8',
          warDir: '/usr/local/tomcat8/webapp/11.war',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat6',
          tomcatName: 'tomcat6',
          warDir: '/usr/local/tomcat6/webapp/aa.war',
        },
        {
          deployStatus: 'noDeploy',
          tomcatDir: '/usr/local/tomcat10',
          tomcatName: 'tomcat10',
          warDir: '',
        },
        ],
        msg: '查询成功！',
        success: true,
      };
    },
  },
];
