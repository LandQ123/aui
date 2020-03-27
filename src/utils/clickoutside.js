import Vue from 'vue';
import { on } from 'aui/src/utils/dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;
// 给document绑定mouseup事件，然后在这个事件里判断点击的target是否包含在目标组件内
!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));
// document绑定了鼠标按下抬起事件(服务端渲染无效)，按下时记录一个按下的dom元素，抬起时遍历所有有该指令的dom，然后执行documentHandler进行判断
!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
// 通过原生的contains方法判断点击处是否被el这个dom元素包含，如果是则return，如果不包含，也就是点击在下拉菜单外，则执行vnode.context[el[ctx].methodName]()调用v-clickoutside="handleClose"中的handleClose方法隐藏下拉菜单
function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
      (vnode.context.popperElm.contains(mouseup.target) ||
      vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  // 在指令第一次被绑定到dom元素时，给dom元素加上要执行的方法等属性，然后给document绑定mouseup事件，后来当用户点击时取出对应的元素的dom进行判断，如果判断为true再取出该dom上之前绑定的方法进行执行
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression, // 字符串形式的指令表达式
      bindingFn: binding.value // 指令的绑定值
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
