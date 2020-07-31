(function f(a, b) {
    return a + b;
})(1, 2);

(function f() {
    console.log("aaa");
});


//
let name = 'hhh';
const o = {
    name,
    func1() {
        console.log('func1');
    }
};
o.func1();

// 等价于

const a = {
    name:name,
    func1: function () {
        console.log('func1');
    }
}

// 字面量作为属性和方法的名称
// const o = {['name']:'phb'};
// o['weight'] = 10;
// f = function ['getAge']() {
//   return 11;
// }


