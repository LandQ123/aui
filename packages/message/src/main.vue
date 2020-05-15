<template>
  <transition name="af-message-fade" @after-leave="handleAfterLeave">
    <div
      class="af-message__wrapper"
      v-drag="dragClass"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div
        :class="[
          'af-message',
          type && !iconClass ? `af-message--${ type }` : '',
          showClose ? 'is-closable' : '',
          customClass
        ]"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
        role="alert">
        <div class="af-message__header" v-if="title !== null">
          <div class="af-message__title">
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="af-message__headerbtn"
            aria-label="Close"
            v-if="showClose">
            <i class="af-message__close af-icon-close"  @click="close"></i>
          </button>
        </div>
        <div class="af-message__content">
          <div 
            :class="['af-message__status', iconClass || typeClass]"
            v-if="iconClass || typeClass">
          </div>
          <div class="af-message__message">
            <slot>
              <div v-if="!dangerouslyUseHTMLString">
                <p class="af-message__message-title" v-if="messageTitle">{{ messageTitle }}</p>
                <p :class="['af-message__message-content', messageTitle && 'is-with-title']" v-if="message !== ''">{{ message }}</p>
              </div>
              <p v-else v-html="message"></p>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'aui/src/utils/popup';
  import { drag } from 'aui/packages/drag/src/directive.js';

  const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    question: 'question',
    error: 'error'
  };

  export default {
    mixins: [Popup],
    directives: {
      drag
    },
    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      isDrag: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        title: '提示',
        messageTitle: '',
        message: '',
        duration: 0,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        closed: false,
        timer: null,
        dangerouslyUseHTMLString: false
      };
    },

    computed: {
      typeClass() {
        return this.type && !this.iconClass
          ? `af-message__icon af-icon-${ typeMap[this.type] }`
          : '';
      },
      dragClass() {
        let classList = {
          header: '.af-message__header',
          box: '.af-message'
        };
        if (this.isDrag) {
          return classList;
        } else {
          return false;
        }
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },

    methods: {
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.close();
      },

      handleAfterLeave() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        this.doAfterClose();
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
      this.$nextTick(() => {
        if (this.closeOnHashChange) {
          window.addEventListener('hashchange', this.close);
        }
      });
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
    }
  };
</script>
