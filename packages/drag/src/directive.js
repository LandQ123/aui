/**
 * v-drag 指令，需要绑定一个包含类名的对象，实现拖动
 *
 * @example
 * v-drag = {
 *   header: '.af-message__header', // 头部的类名
 *   box: '.af-message', // 移动的 box 类名
 *   isSelf: true // 是否是绑定元素本身
 * }
 */
const dragDirective = {};
const drag = {
  bind(el, binding, vnode, oldVnode) {
    let value = binding.value;

    // 绑定的值不是对象, 不进行拖拽
    if (Object.prototype.toString.call(value) !== '[object Object]') return;

    // 如果绑定的是对象, 则校验是否符合
    let header = value.header;
    let box = value.box;
    if (!header || !box) throw new Error('header class and box class were required');

    const $header = el.querySelector(header);
    const $box = value.isSelf ? el : el.querySelector(box);
    $header.style.cursor = 'move';
    // currentStyle: 该属性只兼容 IE, 不兼容火狐和谷歌
    // getComputedStyle: 该属性是兼容火狐谷歌, 不兼容 IE
    const styleObject = $box.currentStyle || window.getComputedStyle($box, null);

    let moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - $header.offsetLeft;
      const disY = e.clientY - $header.offsetTop;
      // 获取到的值带 px 正则匹配替换
      let left = '';
      let top = '';

      // 注意在 ie 中第一次获取到的值为组件自带 50% 移动之后赋值为 px
      if (styleObject.left.includes('%')) {
        left = +document.body.clientWidth * (+styleObject.left.replace(/\%/g, '') / 100);
        top = +document.body.clientHeight * (+styleObject.top.replace(/\%/g, '') / 100);
      } else {
        left = +styleObject.left.replace(/\px/g, '');
        top = +styleObject.top.replace(/\px/g, '');
      };

      document.onmousemove = function(e) {
        // 通过事件委托, 计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        // 移动当前元素
        $box.style.left = `${l + left}px`;
        $box.style.top = `${t + top}px`;
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
    $header.onmousedown = moveDown;
  }
};

dragDirective.install = Vue => {
  Vue.directive('drag', drag);
};

// 用于局部注册
export { drag };
// 用于全局注册
export default dragDirective;
