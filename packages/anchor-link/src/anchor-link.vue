<template>
  <div :class="anchorLinkClasses">
    <a
      :class="linkTitleClasses"
      :href="href"
      :data-scroll-offset="scrollOffset"
      :data-href="href"
      :data-title="title"
    >
      <span
        v-if="index"
        :class="[`${prefix}-index`, {'is-title': $slots.default}]"
        @click.prevent="goAnchor">
        {{index}}
      </span>
      <span
        :class="[`${prefix}-content`, {'is-title': $slots.default}]"
        @click.prevent="goAnchor">
        {{ title }}
      </span>
      <span
        v-if="$slots.default"
        :style="{'padding-right': '10px'}"
        @click.prevent.stop="toggleSubItem"
      >
        <i class="af-icon-arrow-up" :class="[prefix + '-arrow', rotate ? 'rotate-arrow' : '']"></i>
      </span>
    </a>
    <transition name="fade">
      <div v-show="!rotate">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'AfAnchorLink',
  componentName: 'AfAnchorLink',
  inject: ['anchorCom'],
  props: {
    href: String,
    title: String,
    index: [String, Number],
    scrollOffset: {
      type: Number,
      default() {
        return this.anchorCom.scrollOffset;
      }
    }
  },
  data() {
    return {
      prefix: 'af-anchor-link',
      rotate: false
    };
  },
  computed: {
    anchorLinkClasses() {
      return [
        this.prefix,
        this.anchorCom.currentLink === this.href ? `${this.prefix}-active` : ''
      ];
    },
    linkTitleClasses() {
      return [`${this.prefix}-title`];
    }
  },
  methods: {
    goAnchor() {
      this.currentLink = this.href;
      this.anchorCom.handleHashChange();
      this.anchorCom.handleScrollTo();
      this.anchorCom.$emit('select', this.href);
      const isRoute = this.$router;
      if (isRoute) {
        this.$router.push(this.href);
      } else {
        window.location.href = this.href;
      }
    },
    toggleSubItem() {
      this.rotate = !this.rotate;
      setTimeout(_ => {
        this.anchorCom.handleScrollTo();
      }, 250);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.anchorCom.links.push(this.href);
    });
  }
};
</script>
