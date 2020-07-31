### vue 的异步更新
当数据发生改变时， vue 并不会立即更新绑定的view对象， 而是在下一个 事件循环“tick” 中更新， 可以使用 vm.$nextTick()来追踪当组件被重新渲染后的情况。
```javascript 1.5
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
``` 


### next 
1. javascript 特性 和 vue 特性
2. 检查一键部署 表单校验

### js 箭头函数
```javascript 1.5
f = (i) => (j) => {return i + j};    
等价于
f = function (i) {
  return function(j) {
    return i+ j;
  }
}
```

### 立即执行函数


### es6 
#### js 中的各种简写
1. 直接将 变量 和 方法 写入大括号作为对象的属性和方法
```javascript 1.6
let name = 'hhh';
const o = {
    name,
    func1() {
        console.log('func1');
    }
};

// 等价于

const a = {
    name:name,
    func1: function () {
        console.log('func1');
    }
}
```
2. 





