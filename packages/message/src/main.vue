<template>
  <transition name="af-message-fade">
    <div
      :class="[
        'af-message',
        type && !iconClass ? `af-message--${ type }` : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      v-drag="dragClass"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert">
      <!-- success -->
      <template v-if="type === 'success'">
        <i :class="['af-message__icon', iconClass]" v-if="iconClass"></i>
        <i :class="typeClass" v-else></i>
        <slot>
          <p v-if="!dangerouslyUseHTMLString" class="af-message__content">{{ message }}</p>
          <p v-else v-html="message" class="af-message__content"></p>
        </slot>
        <i v-if="showClose" class="af-message__closeBtn af-icon-close" @click="close"></i>  
      </template>
      <!-- 其他 -->
      <template v-else>
        <div class="af-message__wrapper">
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
      </template>
    </div>
  </transition>
</template>

<script type="text/babel">
  const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    question: 'question',
    error: 'error'
  };

  export default {
    data() {
      return {
        visible: false,
        title: '提示',
        messageTitle: '',
        message: '',
        onDefault: true,
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null,
        dangerouslyUseHTMLString: false,
        isDrag: true
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
          box: '.af-message',
          isSelf: true
        };
        if (this.isDrag && this.type !== 'success') {
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
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
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
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
