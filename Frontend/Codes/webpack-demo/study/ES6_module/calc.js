/**
 * 通过 export 关键字就可以将 area 和 circumference 方法导出
 */

const { PI } = Math;
const area = (r) => PI * r ** 2;
const circumference = (r) => 2 * PI * r;
export { area, circumference }