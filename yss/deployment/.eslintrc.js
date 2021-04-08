// ESlint 检查配置
module.exports = {
  root: true,
  // 环境定义了预定义的全局变量。
  env: {
    // 环境定义了预定义的全局变量。更多在官网查看
    // "browser": true,
    node: true,
    // "commonjs": true,
    // "amd": true,
    // "es6": true,
    // "mocha": true
  },
  // JavaScript 语言选项
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 2020,
    parser: 'babel-eslint',
    sourceType: 'module', // script
    // 想使用的额外的语言特性:
    ecmaFeatures: {
      // 允许在全局作用域下使用 return 语句
      globalReturn: true,
      // impliedStric
      impliedStrict: true,
      // 启用 JSX
      jsx: true,
    },
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/standard'],
  // plugins: ['prettier'],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // //////////////
    // 可能的错误 //
    // //////////////

    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁用 console
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 2,
    // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-control-regex': 2,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [1, 'always-multiline'],
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的分号
    'no-extra-semi': 2,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    'no-unreachable': 2,

    // ////////////
    // 最佳实践 //
    // ////////////

    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],

    // ////////////
    // 变量声明 //
    // ////////////

    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现未使用过的变量
    'no-unused-vars': [1, { vars: 'all', args: 'none' }],
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
    // ////////////
    // 风格指南 //
    // ////////////
    // 'no-tabs': 0,
    // 缩进：规则,空额数量
    indent: [2, 2, { SwitchCase: 1 }],
    // 不允许空格和 tab 混合缩进
    // "no-mixed-spaces-and-tabs": 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': 0,
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    semi: [2, 'always'],
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': [0, 'never'],
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': 1,
  },
};
