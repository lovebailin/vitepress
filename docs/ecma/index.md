---
title: ECMAScript整理
titleTemplate: :title
lastUpdated: true
---

# ECMAScript

[JavaScript: Learn JavaScript, jQuery, Angular.JS & More — SitePoint](https://www.sitepoint.com/javascript/)

## ES2016(ES7) 新特性

### Array.prototype.includes

用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

```js
;['a', 'b', 'c'].includes('a') // true
;['a', 'b', 'c'].includes('d') // false
```

在这之前，我们通常会通过 `Array.prototype.indexOf` 来判断。

```javascript
;['a', 'b', 'c'].includes('a') // true
;['a', 'b', 'c'].indexOf('a') !== -1 // true
```

唯一的区别是 `includes()` 方法能找到 `NaN`，而 `indexOf()` 不行。

```javascript
;[NaN].includes(NaN) // true
;[NaN].indexOf(NaN) // -1
```

### Exponentiation Operator 求冥运算

```javascript
2 ** 3 // 2*2*2=8
Math.pow(2, 3) // 2*2*2=8
```

## ES2017(ES8)新特性

### Object.values() / Object.entries()

在 ES6 前，如果我们想拿一个对象的所有值放在数组中，可能得这么写：

```javascript
var object = { a: 1, b: 2, c: 3 }
var array = []
for (var key in object) {
  if (object.hasOwnProperty(key)) {
    array.push(object[key])
  }
}
array // [1, 2, 3]
```

现在，通过 Object.values() 可以便捷的取出来：

```javascript
const object = { a: 1, b: 2, c: 3 }
Object.values(object) // [1, 2, 3]
```

Object.entries() 则是 Object.keys() 和 Object.keys() 的结合形式，返回一个 key value 键值对的数组。

```javascript
const object = { a: 1, b: 2, c: 3 }
Object.entries(object) // [['a', 1], ['b', 2], ['c', 3]]
```

Object.entries() 获得的数组可用于 ES6 带来的 `Map` 结构：

```javascript
const object = { a: 1, b: 2, c: 3 }
const map = new Map(Object.entries(object)) // Map(3) {"a" => 1, "b" => 2, "c" => 3}
```

### String.prototype.padStart() / String.prototype.padEnd()

这两个函数的作用是在头尾添加字符串，它们接收两个参数 `str.padStart(targetLength [, padString])`，其中 `targetLength` 表示填充完的字符串长度，`padString` 表示填充的字符串，默认空格

```javascript
'es8'.padStart(4) // ' es8'，默认填入空格
'es8'.padEnd(4, '0') // 'es80'，填充自定义字符串
'es8'.padStart(2) // 'es8'，如果长度小于原字符串，返回原字符串
'es8'.padStart(6, 'abcd') // 'abces8'，如果填充字符串+原字符串长度大于给定长度，则从填充字符串左边开始截取
'es8'.padEnd(6, 'abcd') // 'es8abc'，padEnd也是从填充字符串左边开始截取
'es8'.padStart(7, 'abc') // 'abcaes8'，如果填充字符串+原字符串长度小于给定长度，则从填充字符串重复填充
```

### Object.getOwnPropertyDescriptors

该函数返回指定对象（参数）的所有自身属性描述符。自身属性描述符就是在对象自身内定义，不是通过原型链继承来的属性。该函数返回的每个描述符对象可能会有的 `key` 值分别是：`configurable`、`enumerable`、`writable`、`get`、`set` 和 `value`。

```javascript
const object = {
  a: 1,
  get b() {
    return 2
  },
}

Object.getOwnPropertyDescriptors(object)
// {
//   a: {
//     configurable: true,
//     enumerable: true,
//     value: 1,
//     writable: true
//   },
//   b: {
//     configurable: true,
//     enumerable: true,
//     get: f b(), //the getter function
//     set: undefined
//   }
// }
```

### 函数参数列表和调用中的尾逗号

ES8 允许在函数定义或者函数调用时，最后一个参数之后存在一个结尾逗号而不报`SyntaxError`的错误。

```javascript
function foo(a, b, c) {
  // doSomething
}

foo(1, 2, 3)
```

这种情况常见于多行参数风格，

```javascript
foo(1, 2, 3)
```

现在再也不会因为增加参数忘了删除逗号而导出报错了。

### async/await 异步函数

`async` 关键字定义的函数声明定义了一个可以异步执行的函数，它返回一个 `Async Function` 类型的对象。

```javascript
async function add10(num) {
  return num + 10
}
add10 // async ƒ add10 (num) {return num + 10;}
```

它的返回值是一个 `Promise` 实例：

```javascript
add10(10) // Promise {<fulfilled>: 20}
```

`await` 放置在 `Promise` 调用之前，`await` 强制后面点代码等待，直到 `Promise` 对象`resolve`，得到 `resolve` 的值作为 await 表达式的运算结果。且 `await` 只能在 `async` 函数内部使用。

```javascript
async function foo() {
  let num = await add10(10)
  console.log(num) // 20
  return num + 10
}

foo() // Promise {<fulfilled>: 30}
```

如果想获得 `Promise` 的 `catch` 情况，我们可以通过 `try...catch` 来解决。

```javascript
function throwError() {
  return Promise.reject(new Error('error'))
}

async function foo() {
  try {
    await throwError(10)
  } catch (e) {
    console.log(e) // Error: error
  }
  return true
}

foo() // Promise {<fulfilled>: true}
```

## ES2018(ES9)新特性

### async/await 异步迭代

ES8 为我们带来 `async/await`，使我们能在同步的写法中执行异步函数，但是在循环中：

```javascript
async function foo(array) {
  for (let i of array) {
    await doSomething(i)
  }
}
```

上面代码执行不符合预期，循环本身依旧保持同步，并在在内部异步函数之前全部调用完成。

ES2018 引入异步迭代器（asynchronous iterators），使得 `await` 可以和 `for...of` 循环一起使用，以串行的方式运行异步操作。

```javascript
async function foo(array) {
  for await (let i of array) {
    doSomething(i)
  }
}
```

### Promise.finally()

ES6 为我们带来了 `Promise`，但是它的结果要么成功 `then` 要么失败 `catch`，使得我们的一些逻辑，如执行状态修改，结束回调都得在两边写一遍。

选择有了 `finally()`，逻辑只可以放在一个地方了，这有点像以前 `jQuery ajax` 的 `complete`。

```javascript
return new Promise((reslove, reject) => {
  // ...
})
  .then(res => {
    // reslove
  })
  .catch(err => {
    // reject
  })
  .finally(() => {
    // complete
  })
```

`finally()`没有参数传入。

### Rest/Spread 属性

ES2015 引入了 Rest 参数和扩展运算符。当时三个点 `...` 仅用于数组。

`Rest` 参数语法允许我们将一个剩余参数表示为一个数组。

```javascript
function foo(a, b, ...rest) {
  // a = 1
  // b = 2
  // rest = [3, 4, 5]
}

foo(1, 2, 3, 4, 5)
```

展开操作符则是将数组转换成可传递给函数的单独参数。

```javascript
const nums = [1, 2, 3, 4, 5];
Math.max(...nums));  // 5
```

现在对象也可以使用它们了。

```javascript
function foo({ a, b, ...rest }) {
  // a = 1
  // b = 2
  // rest = { c: 3, d: 4, e: 5
}

foo({
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
})
```

```javascript
const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
}

const { a, ...rest } = object
// a = 1
// b = 2
// rest = { c: 3, d: 4, e: 5 }
```

跟数组一样，Rest 参数只能在声明的结尾处使用。

### 正则表达式 s（dotAll 模式）标记

在正则中，`.` 可以匹配任意字符，除了换行符。

```javascript
;/hello.es9/.test('hello\nes9') // false
```

ES2018 引入了 dotAll 模式，通过使用标记`s`选项，`.`就可以匹配换行符。

```javascript
;/hello.es9/s.test('hello\nes9') // true
```

### 正则表达式 Unicode 转义

目前在正则中，可以通过字符集的名称来匹配字符。如`s`代表空白

```javascript
;/^\s+$/u.test(' ') // true
```

在 ES2018 添加了 Unicode 属性转义，形式为`\p{...}`和`\P{...}`，在正则表达式中使用标记`u`(unicode) 选项。

```javascript
/^\p{White_Space}+$/u.test(' ')       // true 空格
/^\p{Script=Greek}+$/u.test('μετά')   // true 希腊字母
/^\p{Script=Latin}+$/u.test('Grüße')  // true 匹配拉丁字母
/^\p{Surrogate}+$/u.test('\u{D83D}')  // true 匹配单独的替代字符
```

### lookbehind 反向断言

目前 JavaScript 在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但是断言没有包含在整个匹配字段中。

如匹配字符串“10 hours”中紧跟着是”hours”的数字：

```javascript
const reg = /\d+(?= hours)/u
const matched = reg.exec('10 hours')
matched[0] // 10
```

匹配字符串“10 minutes”中紧跟着不是”hours”的数字：

```javascript
const reg = /\d+(?! hours)/u
const matched = reg.exec('10 minutes')
matched[0] // 10
```

ES2018 引入以相同方式工作但是匹配前面的反向断言（lookbehind）。

匹配字符串“hours10”中”hours”后面的数字：

```javascript
const reg = /(?<=hours)\d+/u
const matched = reg.exec('hours10')
matched[0] // 10
```

匹配字符串“minutes10”中数字前面不是“hours”：

```javascript
const reg = /(?<!hours)\d+/u
const matched = reg.exec('minutes10')
matched[0] // 10
```

### Named capture groups 正则表达式命名捕获组

```javascript
const reg = /(\d{4})-(\d{2})-(\d{2})/u
const matched = reg.exec('2018-12-31')
matched[0] // 2018-12-12
matched[1] // 2018
matched[2] // 12
matched[3] // 31
```

代码可读性较差，并且改变正则表达式的结构有可能改变匹配对象的索引。

ES2018 允许命名捕获组使用符号`?<name>`, 可以指定小括号中匹配内容的名称放在`groups`里，这样可以提高代码的可读性。

```javascript
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
const matched = reg.exec('2018-12-31')
matched.groups.year // 2018
matched.groups.month // 12
matched.groups.day // 31
```

命名捕获组也可以使用在`replace()`方法中。例如将日期转换为“年月日”格式：

```javascript
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
'2018-12-31'.replace(reg, '$<year>年$<month>月$<day>日') // 2018年12月31日
```

### 非转义序列的模板字符串

ES2018 移除对 ECMAScript 在带标签的模版字符串中转义序列的语法限制。

之前，`\u` 开始一个 unicode 转义，`\x` 开始一个十六进制转义，`\`后跟一个数字开始一个八进制转义。这使得创建特定的字符串变得不可能，例如 Windows 文件路径 `C:\uuu\xxx\111`。

[模板字符串 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)

## ES2019(ES10)带来的 9 个新特性

### String.prototype.trimStart() / String.prototype.trimEnd()

在接收用户输入的文本，我们经常会把头尾的空格文本去掉，来规避展示的不受控情况。自 ES5 来，`String.prototype.trim()` 被用于去除头尾上的空格、换行符等，现在通过 `trimStart()`，`trimEnd()` 来头和尾进行单独控制。`trimLeft()`、`trimRight()` 是他们的别名。

```javascript
const string = ' Hello ES2019! '
string.trimStart() // 'Hello ES2019! '
string.trimEnd() // ' Hello ES2019!'
```

### Object.fromEntries()

ES8 为我们引入了`Object.entries`把一个对象转为`[key, value]`键值对的形式，可以运用于像 Map 这种结构中。凡事有来有回，`Object.fromEntries()`用于把键值对还原成对象结构。

```javascript
const entries = [['foo', 'bar']]
const object = Object.fromEntries(entries) // { foo: 'bar' }
```

### Array.prototype.flat() / Array.prototype.flatMap()

把数组展平是 Array 原型给我们带来的新特性，通过传入层级深度参数（默认为 1），来为下层数组提升层级。如果想提升所有层级可以写一个比较大的数字甚至是`Infinity`，当然不推荐这么做。

```javascript
;[1, 2, [3, 4]].flat() // [ 1, 2, 3, 4 ]
;[1, 2, [3, 4, [5, 6]]].flat(2) // [ 1, 2, 3, 4, 5, 6 ]
```

`Array.prototype.flatMap()` 它是 `Array.prototype.map()` 和`Array.prototype.flat()`的组合，通过对 map 调整后的数据尝试展平操作。

```javascript
;[1, 2, [3, 4]].flatMap(v => {
  if (typeof v === 'number') {
    return v * 2
  } else {
    return v.map(v => v * 2)
  }
})
// [2, 4, 6, 8]
```

### catch 的参数改为可选

在进行 `try...catch` 错误处理过程中，如果没有给 catch 传参数的话，代码就会报错。有时候我们并不关心错误情况，如：

```javascript
const isValidJSON = json => {
  try {
    JSON.parse(json)
    return true
  } catch (unusedError) {
    // Unused error parameter
    return false
  }
}
```

在新规范中，我们可以省略 catch 绑定的参数和括号。

```javascript
const isValidJSON = json => {
  try {
    JSON.parse(json)
    return true
  } catch {
    return false
  }
}
```

### Symbol.description

`Symbol` 是 ES6 中引入的基本数据类型，可以用作对象属性的标识符。描述属性是只读的，可用于获取符号对象的描述，更好了解它的作用。

```javascript
const symbol = Symbol('This is a Symbol')
symbol // Symbol(This is a Symbol)
Symbol.description // 'This is a Symbol'
```

### JSON Superset 超集

之前如果 JSON 字符串中包含有行分隔符(\u2028) 和段落分隔符(\u2029)，那么在解析过程中会报错。

```javascript
JSON.parse('"\u2028"') // SyntaxError
```

现在 ES2019 对它们提供了支持。

```javascript
JSON.parse('"\u2028"') // ''
```

### JSON.stringify() 加强格式转化

我们看一下熟知的 emoji 表现：

```javascript
'😎'.length // 2
```

JavaScript 将 emoji 解释为两个字符的原因是 UTF-16 将 emojis（以及其他不寻常的字符）表示为两个代理项的组合。我们的 emoji 用字符'\uD83D'和'\uDE0E'编码。但是如果试图单独编写这样一个字符，例如'\uD83D'，则会认为这是一个无效的文本字符串。在早期版本中，这些字符将替换为特殊字符：

```javascript
JSON.stringify('\uD83D') // '"�"'
```

现在在字符代码之前插入转义字符，结果仍是可读且有效的 UTF-8/UTF-16 代码：

```javascript
JSON.stringify('\uD83D') // '"\\ud83d"'
```

### Array.prototype.sort() 更加稳定

之前，规范允许不稳定的排序算法，如快速排序。

```javascript
let array = [
  { a: 1, b: 2 },
  { a: 2, b: 2 },
  { a: 1, b: 3 },
  { a: 2, b: 4 },
  { a: 5, b: 3 },
]

array.sort((a, b) => a.a - b.a)
// [{a: 1, b: 2}, {a: 1, b: 3}...] / [{a: 1, b: 3}, {a: 1, b: 2}...]
```

在之前的排序中，可能出现 `[{a: 1, b: 2}, {a: 1, b: 3}...]`、`[{a: 1, b: 3}, {a: 1, b: 2}...]` 等多种情况。

现在所有主流浏览器都使用稳定的排序算法。实际上，这意味着如果我们有一个对象数组，并在给定的键上对它们进行排序，那么列表中的元素将保持相对于具有相同键的其他对象的位置。

### Function.prototype.toString() 重新修订

从 ES2019 开始，`Function.prototype.toString()`将从头到尾返回源代码中的实际文本片段。这意味着还将返回注释、空格和语法详细信息。

```javascript
function /* a comment */ foo() {}
```

之前，`Function.prototype.toString()`只会返回了函数的主体，但没有注释和空格。

```javascript
foo.toString() // 'function foo() {}'
```

但现在，函数返回的结果与编写的一致。

```javascript
foo.toString() // 'function /* a comment  */ foo () {}'
```

## ES2020(ES11)带来的新特性

### String.prototype.matchAll

我们知道，原来的 String 原型中，已经提供 `match` 方法，如：

```javascript
const str = 'hello1hello2hello3'
const reg = /hello(\d+)/
const match = str.match(reg)
// ["hello1", "1", index: 0, input: "hello1hello2hello3", groups: undefined]
```

这时我们发现，他只能拿到一组匹配结果，当我们尝试在正则中加入全局 g 时。

```javascript
const matches = str.match(reg) // ["hello1", "hello2", "hello3"]
```

只能拿到一个只有完整匹配结果的 `string[]`，那种在非全局情况下复杂匹配结果没有了。

而 `matchAll` 就给我带来期望的结果：

```javascript
const matchIterator = str.matchAll(reg) // RegExpStringIterator
```

我们发现，返回的结果是一个迭代器（`Iterator`），可以使用 for of 遍历。

```javascript
for (const match of matchIterator) {
  console.log(match)
  // 第一次结果： ["hello1", "1", index: 0, input: "hello1hello2hello3", groups: undefined]
}
```

如果你想要数组的形式，可以通过 `...` 运算符或者 `Array.from()` 转化。

```javascript
const matches1 = [...str.matchAll(reg)]
const matches2 = Array.from(str.matchAll(reg))
```

### BigInt

我们熟知的 `Number` 类型只能安全的表示 -(2^53-1) 至 2^53-1 范的值，即 `Number.MIN_SAFE_INTEGER` 到 `Number.MAX_SAFE_INTEGER` 之间，超过则不能做到精确计算。

为了解决这个问题，引入了 `BigInt` 类型：

```javascript
const bigIntNum1 = 9007199254740991n
const bigIntNum2 = BigInt(9007199254740991)
```

`BigInt` 是跟 `Number` 一样，是原始数据类型：

```javascript
typeof 1 // number
typeof 1n // bigint
```

### Dynamic import 按需加载

ES2020 提案引入 `import()` 函数，支持动态加载模块：

```javascript
import('./foo.js')
```

import() 返回一个 Promise 对象，我们可以在 then 中获取到相应的 export 内容。

```javascript
//  foo.js
export a = 1
export b = 2

//  home.js
import(`./foo.js`)
  .then(({a, b})=>
    // 加载成功的回调
  })
  .catch(err => {
    // 加载失败的回调
  })
```

import() 的加入解决了之前 esm 中只能顶层加入，静态解析的不足。

### Promise.allSettled

`Promise.allSettled` 提供了另外一种并发执行异步任务的处理方式。

跟我们常见的 Promise.all 相比：

`allSettled` 需要等其中的所有任务 resolve 或 reject 后才会改变 status；`all` 所有任务都 resolve 后改变状态。

`allSettled` 无论其中异步任务是 `fulfilled` 还是 `rejected`，最终状态都只有 `fulfilled`；`all` 一旦有任务的变成 `rejected`，本身的状态也会变成 `rejected`。

`allSettled` 让我们更加自由的处理所有并发任务的结果。

```javascript
const resolved = Promise.resolve(true)
const rejected = Promise.reject('custom error')

Promise.allSettled([resolved, rejected]).then(results => {
  console.log(results)
  // [
  //    { status: 'fulfilled', value: true },
  //    { status: 'rejected', reason: 'custom error' }
  // ]
})
```

如上：allSettled 是不会进到 catch 回调中，在 then 回调的返回每个异步任务的结果。

### globalThis

之前，你想写同时支持 Node 和 Browser 环境的代码，获取全局对象会有点费劲：

- Browser 环境中，全局对象是 window，但 Node 和 Web Worker 没有 window。
- Browser 和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，全局对象是 global，但其他环境都不支持。
- 还有 this，受上下文影响，很容易出错。

要获取全局对象，可以封装一个全局函数：

```javascript
function getGlobal() {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('找不到全局对象')
}
```

在 ES2020 标准下，我们可以在任意上下文和环境下通过 `globalThis` 获取到全局对象。

### Nullish coalescing Operator 空值合并运算符

设置默认值最常见的做法就是使用 `||`：

```javascript
const vip = userInfo.vip || '非vip'
```

但是在 JS 中空字符串，0 等在进行判断时，被当为 false 处理。上面的 vip 0 的结果就会变成 非 vip，这个显然是错误的，为了符合我们预期，我们得这么写：

```javascript
const vip = userInfo.vip == null ? '非vip' : userInfo.vip
```

而使用空值合并运算符，能获得简洁的写法：

```javascript
const vip = userInfo.vip ?? '非vip'
```

### Optional chaining 可选链

你是否还记得，为了判断一个多层级对象，写过以下代码：

```javascript
if (a && a.b && a.b.c && a.b.c.d) {
  // do more
}
```

如果不这么做又容易获得 `TypeError` 成就。

在最新的可选链中，大可不必，可以这么写：

```javascript
if (a?.b?.c?.d) {
  // do more
}
```

在 `?` 后面的字段，如果有就返回相应的值，没有返回 `undefined`：

```javascript
const obj = { a: 1 }
obj?.a // 1
obj?.b // undefined
obj?.a?.b // undefined
```

## ES2021(ES12)新特性解读

### String.prototype.replaceAll

原有的 `replace` 如果不用正则表达式只能替换一个，相信不少初学者都塌过这个坑。

```javascript
const a = '112233'
a.replace('1', 'x') // x12233
```

如果想要全部替换，我们只能借助全局的正则表达式：

```javascript
a.replace(/1/g, 'x') // xx2233
```

现在使用 `replaceAll` 不用正则也能达到一样的效果，而且更加直观：

```javascript
a.replaceAll('1', 'x') // xx2233
```

### Promise.any & AggregateError

继 `all`, `race`, `allSettled` 这些批处理方法后，又迎来了一个新的 `any`。

`race` 接收 promise 数组中第一个 `reslove` 的值作为自身的 `reslove`，也就是说只要有一个 `fulfilled` ，它也会是 `fulfilled` 状态。举个例子:

```javascript
const a = Promise.resolve('ok')
const b = Promise.reject('err1')
const c = Promise.reject('err2')

Promise.any([a, b, c]).then(ret => {
  console.log(ret) // ok
})
```

而当所有 promise 都 `rejected` 时，那么它将抛出一个 `AggregateError` 汇总错误消息：

```javascript
const a = Promise.reject('err1')
const b = Promise.reject('err2')
const c = Promise.reject('err3')

Promise.any([a, b, c]).catch(err => {
  console.log(err.errors) // ['err1', 'err2', 'err3']
})
```

### Logical assignment operators（逻辑赋值运算符）

`??`, `&&`, `||` 这三也加入了赋值运算符中，举个例子比较形象：

```javascript
// 原有
a = a ?? b
a = a && b
a = a || b

// 新的
a ??= b
a &&= b
a ||= b
```

注：跟 `a += b` 一样，会改变 `a` 的值，所以不能 `const a`。

### WeakRef & FinalizationRegistry（弱引用和垃圾回收监听）

#### WeakRef

在一般情况下，对象的引用是强引用的，这意味着只要持有对象的引用，它就不会被垃圾回收。只有当该对象没有任何的强引用时，垃圾回收才会销毁该对象并且回收该对象所占的内存空间。

而 `WeakRef` 允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被垃圾回收。

## ES2022(ES13)新特性解读

### Class Fields

### Class Public Instance Fields 公共实例字段

在 ES6 的类中，我们想定义一个默认值，只能通过 constructor 里面定义：

```javascript
class Counter {
  constructor() {
    this._num = 0
  }
}
```

现在我们可以这样：

```javascript
class Counter {
  _num = 0
}
```

是不是感觉很熟悉？是的，我在 Node.js v12 就用了，但是现在才进到标准中。

当然也可以不初始化，默认就是 `undefined`。

### Private Instance Fields 私有实例字段

原来的类实例的所有字段都可以被访问和修改：

```javascript
class Counter {
  _num = 0
}

const counter = new Counter()
console.log(counter._num) // 0
```

`_num` 是一些约定成俗表示私有的用法，但是并不能阻止该被访问和修改，防君子不防小人。

现在可以通过 # 前缀来表示私有，当我们访问或者修改时就会抛出错误：

```javascript
class Counter {
  #num = 0
}

const counter = new Counter()
console.log(counter.#num) // Uncaught SyntaxError: Private field '#num' must be declared in an enclosing class
```

### Private instance methods and accessors 私有实例方法和访问器

```javascript
class Counter {
  #num

  constructor() {
    console.log(this.#getNum) // undefined
    this.#initNum = 0
    console.log(this.#getNum) // 0
  }

  get #getNum() {
    return this.#num
  }

  set #initNum(num) {
    this.#num = num
  }
}

const counter = new Counter()
console.log(counter.#initNum) // VM723:1 Uncaught SyntaxError: Private field '#initNum' must be declared in an enclosing class
```

### Static class fields and methods 静态公共字段和方法

在新的提案中，我们可以往类添加静态字段和方法，使用 static 关键字声明，这在其他语言非常常见：

```javascript
class Counter {
  #num = 0

  static baseNum = 100

  // 静态方法可以通过 this 访问静态字段
  static getDoubleBaseNum() {
    return this.baseNum * 2
  }
}

// 静态字段和方法通过类本身访问
console.log(Counter.baseNum) // 100
console.log(Counter.getDoubleBaseNum()) // 200

// 实例不能访问静态字段和方法
const counter = new Counter()
console.log(counter.baseNum) // undefined
```

### Private static class fields and methods 静态私有字段和方法

静态字段和方法也可以通过 # 前缀来表示私有：

```javascript
class Counter {
  #num = 0

  static #baseNum = 100

  static getDoubleBaseNum() {
    return this.#baseNum * 2
  }

  getBaseNum() {
    return Counter.#baseNum
  }
}

// 私有静态字段不能被直接访问
console.log(Counter.#baseNum) // Uncaught SyntaxError: Private field '#baseNum' must be declared in an enclosing class
// 同类静态方法可以访问私有静态字段
console.log(Counter.getDoubleBaseNum()) // 200

// 实例可以访问同类下的私有静态字段和方法
const counter = new Counter()
console.log(counter.getBaseNum()) // 100
```

### Class Static Block 类静态初始化块

这个提案的也比较熟，Java 语言就有用到，先看个例子：

```javascript
class Counter {
  static running

  static {
    try {
      this.running = doRun()
    } catch {
      this.running = false
    }
  }
}
```

从上面可以看出，`static {}` 很像静态的 `constructor` 。

它也可以访问修改私有静态字段和方法：

```javascript
class Counter {
  static #baseNum = 100

  static getDoubleBaseNum() {
    return this.#baseNum * 2
  }

  static {
    this.#baseNum = 200
  }
}

console.log(Counter.getDoubleBaseNum()) // 400
```

甚至将私有静态字段暴露出去：

```javascript
let getBaseNum

class Counter {
  static #baseNum = 100

  static {
    getBaseNum = () => this.#baseNum
  }
}

console.log(getBaseNum()) // 100
```

### Ergonomic brand checks for Private Fields 私有字段检查

主要是检测一个对象或实例是否存在私有字段或方法：

```javascript
class C {
  #brand

  #method() {}

  get #getter() {}

  static isC(obj) {
    return #brand in obj && #method in obj && #getter in obj
  }
}
```

### RegExp Match Indices

新提案允许我们利用 `/d` 标识符来表示想要匹配字符串的开始和结束索引。举个例子：

```javascript
const re1 = /a+(z)?/

const s1 = 'xaaaz'
const m1 = re1.exec(s1)

console.log(m1[0]) // 'aaaz'
console.log(m1[1]) // 'z'
```

在此之前我们并不能完成知道所以匹配的字符在目标字符串的位置，现在通过 `/d` 标识符，匹配结果会多出一个属性 `.indices`：

```javascript
const re1 = /a+(z)?/d

const s1 = 'xaaaz'
const m1 = re1.exec(s1)

console.log(m1.indices[0]) // [1, 5]
console.log(s1.slice(...m1.indices[0])) // 'aaaz'
console.log(m1.indices[1]) // [4, 5]
console.log(s1.slice(...m1.indices[1])) // 'z'
```

还可以添加命名组，如 `?<Z>`：

```javascript
const re1 = /a+(?<Z>z)?/d

const s1 = 'xaaaz'
const m1 = re1.exec(s1)

console.log(m1.groups.Z) // 'z'
console.log(m1.indices.groups.Z) // [4, 5]
```

### Top-level `await`

该提案可以让 `await` 提升到模块中，不需要和 `async` 强绑定了，在此之前：

```javascript
// awaiting.mjs
let output
async function main() {
  output = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 500)
  })
}
main()
export { output }
```

如果我们要引用 output 值：

```javascript
// usage.mjs
import { output } from "./awaiting.mjs";

console.log(output);                         // undefined
setTimeout(() => console.log(output, 1000);  // 100
```

很明显，我们不能立即引用到异步的值，所以大部分情况我们会引用一个返回异步调用的方法来解决问题，如：

```javascript
// compiler.mjs
let vueCompiler
const getVueCompiler = async () => {
  if (vueCompiler) return vueCompiler
  vueCompiler = await import('@vue/compiler-sfc')
  return vueCompiler
}
export { getVueCompiler }

// usage.mjs
import { getVueCompiler } from './compiler.mjs'

const compiler = await getVueCompiler()
```

在顶层 `await` 加持下，我们可以：

```javascript
// awaiting.mjs
function main() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 500)
  });
}
export const output = await main();

// usage.mjs
import { output } from "./awaiting.mjs";

console.log(output);                         // 100
setTimeout(() => console.log(output, 1000);  // 100
```

可以看到， await 不需要在 async 函数中使用了，我们引用模块的可以等待 ESM 模块异步执行完毕在去执行。

### `.at()`

我们要访问数组某一项，通常是这么做：

```javascript
const arr = [1, 2, 3]

console.log(arr[0]) // 1
console.log(arr[arr.length - 1]) // 3
```

从上面可以看出，访问前面的数组还好，倒过来访问就略显难受，特别是数组动态算出来的，比如：

```javascript
console.log([1, 2, 3 ...].map(v => v + 1)[[1, 2, 3 ...].map(v => v + 1).length - 1]);  // 4
```

上面这种情况，我们不得不用一个变量存起来。

新增 `Array.prototype.at` 就可以解决问题，这个跟 `String.prototype.at` 用法基本一致。

```javascript
const arr = [1, 2, 3]
console.log(arr[arr.length - 1]);  // 3
// ↓↓
console.log(arr.at(-1));           // 3

// 动态算出来也能变得简洁
console.log([1, 2, 3 ...].map(v => v + 1)[[1, 2, 3 ...].map(v => v + 1).length - 1]);  // 4
// ↓↓
console.log([1, 2, 3 ...].map(v => v + 1).at(-1));
```

### Accessible `Object.prototype.hasOwnProperty`

我记得最早的时候，我们要遍历一个对象，会这么写：

```javascript
for (var k in obj) {
  if (obj.hasOwnProperty(k)) {
    // 获取可枚举对象
  }
}
```

后续这么使用 eslint 就会弹出提示：

```csharp
Do not access Object.prototype method 'hasOwnProperty' from target object.
```

这是一个不安全的行为，比如 `{"hasOwnProperty": 1}`，可能会导致服务器崩溃。

为了解决问题，我们改成这样：

```javascript
Object.prototype.hasOwnProperty.call(obj, 'key')
```

这样就可以避免访问目标对象 Object 原型方法。

来到重点了，新的提案简化了：

```javascript
Object.prototype.hasOwnProperty.call(obj, 'key')
// ↓↓
Object.hasOwn(obj, 'key')
```

### Error Cause

```javascript
async function getSolution() {
  const rawResource = await fetch('//domain/resource-a').catch(err => {
    // 平时我们要抛出错误有以下几种方式：
    // 1. throw new Error('Download raw resource failed: ' + err.message);
    // 2. const wrapErr = new Error('Download raw resource failed');
    //    wrapErr.cause = err;
    //    throw wrapErr;
    // 3. class CustomError extends Error {
    //      constructor(msg, cause) {
    //        super(msg);
    //        this.cause = cause;
    //      }
    //    }
    //    throw new CustomError('Download raw resource failed', err);
  })
  const jobResult = doComputationalHeavyJob(rawResource)
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
}

await doJob() // => TypeError: Failed to fetch
```

举个例子：

```javascript
async function getSolution() {
  const rawResource = await fetch('//domain/resource-a').catch(err => {
    // 平时我们要抛出错误有以下几种方式：
    // 1. throw new Error('Download raw resource failed: ' + err.message);
    // 2. const wrapErr = new Error('Download raw resource failed');
    //    wrapErr.cause = err;
    //    throw wrapErr;
    // 3. class CustomError extends Error {
    //      constructor(msg, cause) {
    //        super(msg);
    //        this.cause = cause;
    //      }
    //    }
    //    throw new CustomError('Download raw resource failed', err);
  })
  const jobResult = doComputationalHeavyJob(rawResource)
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
}

await doJob() // => TypeError: Failed to fetch
```

在新的提案中，加入了 cause 来收集原因，规范化整个错误抛出和收集：

```javascript
async function doJob() {
  const rawResource = await fetch('//domain/resource-a').catch(err => {
    // 抛出一个低等级错误err，可以通过 cause 包装成高等级错误 Error
    throw new Error('Download raw resource failed', { cause: err })
  })
  const jobResult = doComputationalHeavyJob(rawResource)
  await fetch('//domain/upload', { method: 'POST', body: jobResult }).catch(
    err => {
      throw new Error('Upload job result failed', { cause: err })
    }
  )
}

try {
  await doJob()
} catch (e) {
  console.log(e)
  console.log('Caused by', e.cause)
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```
