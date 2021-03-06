/**
 * 合并对象
 * @param target 要合并到的对象
 * @returns {Object} 合并后的新对象
 */
// Object.assign()的兼容性写法
export default function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) { // 从第二个参数开始
    let source = arguments[i] || {}; // 获取该对象
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) { // 只处理不是从原型链上继承来的属性
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value; // 覆盖
        }
      }
    }
  }

  return target;
};
