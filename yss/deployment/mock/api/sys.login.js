const userDB = [
  { username: 'admin', password: '123', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '用户1' },
]

export default [
  {
    path: '/user/login',
    method: 'post',
    handle({ params }) {
      const user = userDB.find(e => e.username === params.username && e.password === params.password)
      if (user) {
        return {
          msg: '',
          code: 'SUCCESS',
          data: {
            name: 'admin',
            token: '8dfhassad0asdjwoeiruty',
          },
          success: true,
        }
      } else {
        return {
          code: 401,
          msg: '用户名或密码错误',
          success: false,
          data: {},
        }
      }
    },
  },
]
