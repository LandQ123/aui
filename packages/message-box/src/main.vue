<template>
  <transition name="msgbox-fade">
    <div
      class="af-message-box__wrapper"
      v-drag="dragClass"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div class="af-message-box" :class="[customClass, center && 'af-message-box--center']">
        <div class="af-message-box__header" v-if="title !== null">
          <div class="af-message-box__title">
            <div
              :class="['af-message-box__status', icon]"
              v-if="icon && center">
            </div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="af-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="af-message-box__close af-icon-close"></i>
          </button>
        </div>
        <div class="af-message-box__content">
          <div
            :class="['af-message-box__status', icon]"
            v-if="icon && !center">
          </div>
          <div class="af-message-box__message">
            <slot>
              <div v-if="!dangerouslyUseHTMLString">
                <p class="af-message-box__message-title" v-if="messageTitle">{{ messageTitle }}</p>
                <p :class="['af-message-box__message-content', messageTitle && 'is-with-title']" v-if="message !== ''">{{ message }}</p>
              </div>
              <p v-else v-html="message"></p>
            </slot>
          </div>
        </div>
        <div :class="['af-message-box__btns', reverseButtonPosition && 'af-message-box__btns-reverse']">
          <af-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </af-button>
          <af-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </af-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'aui/src/utils/popup';
  import Locale from 'aui/src/mixins/locale';
  import AfButton from 'aui/packages/button';
  import Dialog from 'aui/src/utils/aria-dialog';
  import { drag } from 'aui/packages/drag/src/directive.js';
  
  let messageBox;
  let typeMap = {
    success: 'success',
    info: 'info',
    question: 'question',
    warning: 'warning',
    error: 'error'
  };

  export default {
    mixins: [Popup, Locale],
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
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      },
      isDrag: {
        type: Boolean,
        default: true
      }
    },

    components: {
      AfButton
    },

    computed: {
      icon() {
        const { type, iconClass } = this;
        return iconClass || (type && typeMap[type] ? `af-icon-${ typeMap[type] }` : '');
      },
      confirmButtonClasses() {
        return `af-button--primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      },
      dragClass() {
        let classList = {
          header: '.af-message-box__header',
          box: '.af-message-box'
        };
        if (this.isDrag) {
          return classList;
        } else {
          return false;
        }
      }
    },

    methods: {
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(this.restoreBodyStyle, 200);
        }
        this.opened = false;
        this.doAfterClose();
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
        }
      },

      handleAction(action) {
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      getFirstFocus() {
        const btn = this.$el.querySelector('.af-message-box__btns .af-button');
        const title = this.$el.querySelector('.af-message-box__btns .af-message-box__title');
        return btn || title;
      }
    },

    watch: {
      visible(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        if (this.closeOnHashChange) {
          window.addEventListener('hashchange', this.close);
        }
      });
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    beforeRouteLeave(to, from, next) {
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        messageTitle: '',
        type: '',
        iconClass: '',
        customClass: '',
        showConfirmButton: true,
        showCancelButton: false,
        reverseButtonPosition: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false,
        distinguishCancelAndClose: false
      };
    }
  };
</script>
