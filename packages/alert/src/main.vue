<template>
  <transition name="af-alert-fade">
    <!-- single alert -->
    <div
      v-if="interact === 'simple'"
      class="af-alert"
      :class="[typeClass, center ? 'is-center' : '']"
      v-show="visible"
      role="alert"
    >
      <i class="af-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="af-alert__content">
        <span class="af-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="af-alert__description" v-if="description">{{ description }}</p>
        </slot>
        <i class="af-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'af-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>

    <!-- mutiple alerts and linked with form components -->
    <ul
      class="af-alert-mutiple" 
      v-if="interact === 'link' && tips.length > 0">
      <li
        v-for="(tip, index) in tips"
        :key="index"
        class="af-alert"
        :class="[
          typeClass, 
          center ? 'is-center' : '',
          tip.ref === currentHoverTip ? 'is-hover' : ''
        ]"
        v-show="visible"
        @mouseout="connectComponent('mouseout', tip.ref)"
        @mouseover="connectComponent('mouseover', tip.ref)"
        role="alert">
        <i 
          class="af-alert__icon af-icon-warning" 
          :class="[ isBigIcon ]" 
          v-if="showIcon"></i>

        <div class="af-alert__content">
          <span 
            class="af-alert__title" 
            :class="[ isBoldTitle ]" 
            v-if="tip.title">{{ (index + 1) + '.' + tip.title }}</span>
        </div>
      </li>
    </ul>
  </transition>
</template>

<script type="text/babel">
  import bus from '../alert-bus';
  import Emitter from 'aui/src/mixins/emitter';

  const TYPE_CLASSES_MAP = {
    'success': 'af-icon-info',
    'warning': 'af-icon-info',
    'error': 'af-icon-error'
  };
  export default {
    name: 'AfAlert',

    mixins: [Emitter],

    props: {
      /**
       * simple: default alert
       * link: support multiple alerts that can be linked with form components
       */
      interact: {
        type: String,
        default: 'simple'
      },
      tips: {
        type: Array
      },
      title: {
        type: String,
        default: ''
        // required: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'warning'
      },
      closable: {
        type: Boolean,
        default: false
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      center: Boolean
    },

    data() {
      return {
        visible: true,
        currentHoverTip: ''
      };
    },

    mounted() {
      this.$nextTick(_ => {
        this.interact === 'link' && bus.$on('alerttips-up', ({type, ref, isFocus = false}, cb) => {
          let resp = false;
          let isCurrentTip = false;
          let index = this.tips.findIndex(val => val.ref === ref);
          let hasTips = index >= 0;

          if (this.tips.length > 0) {
            switch (type) {
              case 'initStatus':
                resp = hasTips;
                break;

              case 'mouseover':
                if (hasTips) {
                  this.currentHoverTip = ref;
                  resp = true;
                }
                break;

              case 'mouseout':
                if (hasTips) {
                  resp = hasTips;
  
                  if (ref === this.currentHoverTip) {
                    this.currentHoverTip = !isFocus ? '' : this.currentHoverTip;
                    isCurrentTip = isFocus;
                  } else {
                    this.currentHoverTip = this.currentHoverTip;
                    bus.$emit('alerttips-down', {
                      type: 'mouseover',
                      ref: this.currentHoverTip
                    });
                  }
                }
                break;

              case 'blur':
                resp = hasTips;
                if (hasTips && this.currentHoverTip === ref) {
                  this.currentHoverTip = '';
                }
                break;
  
              default:
                break;
            }
          }

          index = index >= 0 ? index + 1 : -1;
          cb(resp, isCurrentTip, index);
        });
      });
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      },
      /**
       * connect to component
       *
       * @param {Number} type mouseout, mouseover
       * @param {String} ref component
       */
      connectComponent(type, ref) {
        this.currentHoverTip = type === 'mouseover' ? ref : '';
        bus.$emit('alerttips-down', {type, ref});
      }
    },

    computed: {
      typeClass() {
        return `af-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'af-icon-info';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    },

    watch: {
      interact: {
        handler(value) {
          value === 'link' && !this.tips && console.error("property 'tips' is required!");
        },
        immediate: true
      }
    }
  };
</script>
