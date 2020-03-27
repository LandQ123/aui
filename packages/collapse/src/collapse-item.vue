<template>
  <div class="af-collapse-item" :class="{'is-active': isActive}">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`af-collapse-content-${id}`"
      :aria-describedby ="`af-collapse-content-${id}`"
    >
      <div
        class="af-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`af-collapse-head-${id}`"
        tabindex="0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <i
          class="af-collapse-item__arrow af-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
        <slot name="title">
          <span style="padding: 0 10px;">{{title}}</span>
        </slot>
      </div>
    </div>
    <af-collapse-transition>
      <div
        class="af-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`af-collapse-head-${id}`"
        :id="`af-collapse-content-${id}`"
      >
        <div class="af-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </af-collapse-transition>
  </div>
</template>
<script>
  import AfCollapseTransition from 'main/transitions/collapse-transition';
  import Emitter from 'main/mixins/emitter';
  import { generateId } from 'main/utils/util';

  export default {
    name: 'AfCollapseItem',

    componentName: 'AfCollapseItem',

    mixins: [Emitter],

    components: { AfCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      }
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      },
      id() {
        return generateId();
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        this.dispatch('AfCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('AfCollapse', 'item-click', this);
      }
    }
  };
</script>
