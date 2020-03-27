/*
 * v-drag指令
 * 需要给他绑定一个含有class名称的对象, 例如在af-message:
 * header: '.af-message__header',
 * box: '.af-message',
 * isSelf: true // box 是否是 v-drag 指令绑定的元素本身
 */
const dragDirective = {};
dragDirective.install = Vue => {
  Vue.directive('drag', {
    bind(el, binding, vnode, oldVnode) {
      let value = binding.value;
      // 只要绑定的值不是对象, 就判断是禁止拖拽
      if (Object.prototype.toString.call(value) !== '[object Object]') return;
      // 如果绑定的是对象, 则校验是否符合
      let header = value.header;
      let box = value.box;
      let validate = (header, box) => {
        if (!header || !box) {
          throw new Error('(v-drag) header class and box class were required');
        } else if (typeof header !== 'string' || typeof box !== 'string') {
          throw new Error('(v-drag) className expected string');
        } else {
          return true;
        }
      };
      if (!validate(header, box)) return;
      const $header = el.querySelector(header);
      const $box = value.isSelf ? el : el.querySelector(box);
      $header.style.cursor = 'move';
      // currentStyle: 该属性只兼容IE,不兼容火狐和谷歌
      // getComputedStyle: 该属性是兼容火狐谷歌,不兼容IE
      const styleObject = $box.currentStyle || window.getComputedStyle($box, null);
      let moveDown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - $header.offsetLeft;
        const disY = e.clientY - $header.offsetTop;
        // 获取到的值带px 正则匹配替换
        let left = '';
        let top = '';
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styleObject.left.includes('%')) {
          left = +document.body.clientWidth * (+styleObject.left.replace(/\%/g, '') / 100);
          top = +document.body.clientHeight * (+styleObject.top.replace(/\%/g, '') / 100);
        } else {
          left = +styleObject.left.replace(/\px/g, '');
          top = +styleObject.top.replace(/\px/g, '');
        };
        console.log(left, top);
        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
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
  });
};
export default dragDirective;
