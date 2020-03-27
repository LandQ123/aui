<template>
  <transition name="af-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="af-autocomplete-suggestion af-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <af-scrollbar
        tag="ul"
        wrap-class="af-autocomplete-suggestion__wrap"
        view-class="af-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="af-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </af-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from 'aui/src/utils/vue-popper';
  import Emitter from 'aui/src/mixins/emitter';
  import AfScrollbar from 'aui/packages/scrollbar';

  export default {
    components: { AfScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'AfAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('AfAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input;
      this.referenceList = this.$el.querySelector('.af-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
