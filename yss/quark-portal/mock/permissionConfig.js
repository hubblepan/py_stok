/**
 * 权限配置mock接口
 */
import Mock from 'mockjs';

/**
 * 生成主表数据列表
 */
const getDataList = (size = 40) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      key: '@id',
      indexName: '@string(upper,7)',
      indexCode: '@integer(100000,999999)',
    });
    tempList.push(listItem);
  }
  return tempList;
};

const dataList = getDataList();

// 指标维度 右侧从表
const getTreeList = () => {
  const list = [
    {
      key: 1,
      userName: 'John',
      userNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
        {
          postCode: 'post3',
          checked: false,
        },
        {
          postCode: 'post4',
          checked: false,
        },
        {
          postCode: 'post5',
          checked: false,
        },
        {
          postCode: 'post6',
          checked: false,
        },
      ],
      children: [
        {
          key: 11,
          userName: 'John',
          userNumber: 426768,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],
        },
        {
          key: 12,
          userName: 'John',
          userNumber: 3098789,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],

          children: [
            {
              key: 121,
              userName: 'Brown',
              userNumber: 168986,
              checked: false,
              posts: [
                {
                  postCode: 'post1',
                  checked: false,
                },
                {
                  postCode: 'post2',
                  checked: false,
                },
                {
                  postCode: 'post3',
                  checked: false,
                },
                {
                  postCode: 'post4',
                  checked: false,
                },
                {
                  postCode: 'post5',
                  checked: false,
                },
                {
                  postCode: 'post6',
                  checked: false,
                },
              ],
            },
          ],
        },
        {
          key: 13,
          userName: 'sr.',
          userNumber: 7212234,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],
          children: [
            {
              key: 131,
              userName: 'Green',
              userNumber: 4256577,
              checked: false,
              posts: [
                {
                  postCode: 'post1',
                  checked: false,
                },
                {
                  postCode: 'post2',
                  checked: false,
                },
                {
                  postCode: 'post3',
                  checked: false,
                },
                {
                  postCode: 'post4',
                  checked: false,
                },
                {
                  postCode: 'post5',
                  checked: false,
                },
                {
                  postCode: 'post6',
                  checked: false,
                },
              ],
              children: [
                {
                  key: 1311,
                  userName: 'jr.',
                  userNumber: 2567686,
                  checked: false,
                  posts: [
                    {
                      postCode: 'post1',
                      checked: false,
                    },
                    {
                      postCode: 'post2',
                      checked: false,
                    },
                    {
                      postCode: 'post3',
                      checked: false,
                    },
                    {
                      postCode: 'post4',
                      checked: false,
                    },
                    {
                      postCode: 'post5',
                      checked: false,
                    },
                    {
                      postCode: 'post6',
                      checked: false,
                    },
                  ],
                },
                {
                  key: 1312,
                  userName: 'Jimmy',
                  userNumber: 1878678,
                  checked: false,
                  posts: [
                    {
                      postCode: 'post1',
                      checked: false,
                    },
                    {
                      postCode: 'post2',
                      checked: false,
                    },
                    {
                      postCode: 'post3',
                      checked: false,
                    },
                    {
                      postCode: 'post4',
                      checked: false,
                    },
                    {
                      postCode: 'post5',
                      checked: false,
                    },
                    {
                      postCode: 'post6',
                      checked: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      userName: 'Joe Black',
      userNumber: 3287970,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
        {
          postCode: 'post3',
          checked: false,
        },
        {
          postCode: 'post4',
          checked: false,
        },
        {
          postCode: 'post5',
          checked: false,
        },
        {
          postCode: 'post6',
          checked: false,
        },
      ],
      children: [
        {
          key: 21,
          userName: 'John',
          userNumber: 426768,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],
        },
        {
          key: 22,
          userName: 'John',
          userNumber: 3098789,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],

          children: [
            {
              key: 221,
              userName: 'Brown',
              userNumber: 168986,
              checked: false,
              posts: [
                {
                  postCode: 'post1',
                  checked: false,
                },
                {
                  postCode: 'post2',
                  checked: false,
                },
                {
                  postCode: 'post3',
                  checked: false,
                },
                {
                  postCode: 'post4',
                  checked: false,
                },
                {
                  postCode: 'post5',
                  checked: false,
                },
                {
                  postCode: 'post6',
                  checked: false,
                },
              ],
            },
          ],
        },
        {
          key: 23,
          userName: 'sr.',
          userNumber: 7212234,
          checked: false,
          posts: [
            {
              postCode: 'post1',
              checked: false,
            },
            {
              postCode: 'post2',
              checked: false,
            },
            {
              postCode: 'post3',
              checked: false,
            },
            {
              postCode: 'post4',
              checked: false,
            },
            {
              postCode: 'post5',
              checked: false,
            },
            {
              postCode: 'post6',
              checked: false,
            },
          ],
          children: [
            {
              key: 231,
              userName: 'Green',
              userNumber: 4256577,
              checked: false,
              posts: [
                {
                  postCode: 'post1',
                  checked: false,
                },
                {
                  postCode: 'post2',
                  checked: false,
                },
                {
                  postCode: 'post3',
                  checked: false,
                },
                {
                  postCode: 'post4',
                  checked: false,
                },
                {
                  postCode: 'post5',
                  checked: false,
                },
                {
                  postCode: 'post6',
                  checked: false,
                },
              ],
              children: [
                {
                  key: 2311,
                  userName: 'jr.',
                  userNumber: 2567686,
                  checked: false,
                  posts: [
                    {
                      postCode: 'post1',
                      checked: false,
                    },
                    {
                      postCode: 'post2',
                      checked: false,
                    },
                    {
                      postCode: 'post3',
                      checked: false,
                    },
                    {
                      postCode: 'post4',
                      checked: false,
                    },
                    {
                      postCode: 'post5',
                      checked: false,
                    },
                    {
                      postCode: 'post6',
                      checked: false,
                    },
                  ],
                },
                {
                  key: 2312,
                  userName: 'Jimmy',
                  userNumber: 1878678,
                  checked: false,
                  posts: [
                    {
                      postCode: 'post1',
                      checked: false,
                    },
                    {
                      postCode: 'post2',
                      checked: false,
                    },
                    {
                      postCode: 'post3',
                      checked: false,
                    },
                    {
                      postCode: 'post4',
                      checked: false,
                    },
                    {
                      postCode: 'post5',
                      checked: false,
                    },
                    {
                      postCode: 'post6',
                      checked: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return list;
};

const treeList = getTreeList();

// 用户维度 左侧主表
const getUserTreeList = () => {
  const list = [
    {
      key: 1,
      userName: 'John',
      userCode: 603456,
      checked: false,
      children: [
        {
          key: 11,
          userName: 'John1',
          userCode: 426768,
          checked: false,
        },
        {
          key: 12,
          userName: 'John2',
          userCode: 426768,
          checked: false,
        },
        {
          key: 13,
          userName: 'John3',
          userCode: 426768,
          checked: false,
        },
      ],
    },
    {
      key: 2,
      userName: 'Joe Black',
      userCode: 3287970,
      checked: false,
      children: [
        {
          key: 21,
          userName: 'Joe Black1',
          userCode: 46576576,
          checked: false,
        },
        {
          key: 22,
          userName: 'Joe Black2',
          userCode: 46576576,
          checked: false,
        },
      ],
    },
    {
      key: 3,
      userName: 'Henry',
      userCode: 46456654,
      checked: false,
    },
  ];
  return list;
};

const userTreeList = getUserTreeList();

const getUserList = () => {
  const list = [
    {
      key: 1,
      indexName: 'John',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 2,
      indexName: 'Henry',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 3,
      indexName: 'Henry11',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 4,
      indexName: 'vists',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 5,
      indexName: 'fgfgh',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 6,
      indexName: 'qwewxfr',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 7,
      indexName: 'moijhh',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 8,
      indexName: 'xdfgtg',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 9,
      indexName: 'wqwrcgc',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 10,
      indexName: 'bvrtrc',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 11,
      indexName: 'zeerf',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
    {
      key: 12,
      indexName: 'iniyg',
      indexNumber: 603456,
      checked: false,
      posts: [
        {
          postCode: 'post1',
          checked: false,
        },
        {
          postCode: 'post2',
          checked: false,
        },
      ],
    },
  ];
  return list;
};

const userList = getUserList();

export default {
  // 主表数据查询
  'GET /ocp/masterPermission/query': {
    code: 'success',
    data: dataList,
    msg: '查询成功！',
    success: true,
  },
  'GET /ocp/TreePermission/save': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: userTreeList,
      success: true,
      msg: '保存成功！',
    };
    res.json(data);
  },
  'GET /ocp/TreePermission/copy': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: userTreeList,
      success: true,
      msg: '复制成功！',
    };
    res.json(data);
  },
  'GET /ocp/treePermission/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: treeList,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  'GET /ocp/userPermission/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: userList,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },
  'GET /ocp/userTreePermission/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: userTreeList,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },
};
