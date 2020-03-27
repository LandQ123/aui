// 调用/触发指定子孙组件的事件
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    // 寻找符合指定名称的子组件
    if (name === componentName) {
      // 在符合的子组件上触发的事件，但是不会再继续寻找符合名称的组件的子集
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 不符合继续寻找他的子集（即孙子组件）
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 调用/触发指定父组件的事件，接收组件名，事件名，参数
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      // 寻找父级，如果父级是不符合的组件名，则循环往上查找
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      // 找到符合组件名称的父级后，触发其事件，整体流程类似jQuery的closest方法
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
