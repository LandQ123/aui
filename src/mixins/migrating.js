/**
 * Show migrating guide in browser console.
 * 使用旧的API时控制台的提示
 * Usage:
 * import Migrating from 'aui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 * 版本迭代的过程中，若 API 发生变化，如何友好地提示用户

在历次迭代中，我们会尽量保持 API 的一致。但是在一些万不得已的情况下，需要对 API 作出一些更新。对于老版本的用户而言，如果使用了被移除的 API，升级到新版后会出现一些意料之外的报错信息。为了友好地帮助用户尽快找到报错的来源，我们编写了一个 mixin ，当组件的 API 发生变化时，在组件中引入这个 mixin 并列出变化前后的字段名即可。

 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') return;
    if (!this.$vnode) return;
    const { props = {}, events = {} } = this.getMigratingConfig();
    const { data, componentOptions } = this.$vnode;
    const definedProps = data.attrs || {};
    const definedEvents = componentOptions.listeners || {};
    // 在组件 mounted 的时候判断定义的属性和事件是否和外面传入的一致，如果不一致根据分类提示不同的信息
    for (let propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn(`[AUI Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }

    for (let eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn(`[AUI Migrating][${this.$options.name}][Event]: ${events[eventName]}`);
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};
