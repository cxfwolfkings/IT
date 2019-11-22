/**
 * 通过 import 和 from 关键字将用到的两个方法从 calc.js 中引入。
 * 在 main.js 中如果我们有同名的 area 变量名，
 * ES6 中还提供了 as 关键字让我们对导出的变量重命名：
 */
import { area as mj, circumference as zc } from './calc.js'

// 另外，如果我们希望将一个模块中的所有的声明都导出来，
// 但又不想逐一把所有的变量名写出来，es6 也提供了便捷的实现：
import * as calc from './calc.js'
// 这相当于将模块中的所有声明聚合到一个命名空间上，
// 这对有大量的声明需要引入的场景十分有效。

const r = 10;

console.log(mj(r));
console.log(zc(r));

console.log(calc.area(r));
console.log(circumference(r));

// 在 ES6 模块中输出的是值的引用（CommonJS 模块输出的是值的拷贝）
import { num, inc } from './count';
console.log(num); // 1
inc();
console.log(num); // 2
