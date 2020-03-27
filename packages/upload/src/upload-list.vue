<template>
  <transition-group
    tag="ul"
    :class="[
      'af-upload-list',
      'af-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="af-list"
  >
    <li
      v-for="file in files"
      :class="['af-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <img
        class="af-upload-list__item-thumbnail"
        v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
        :src="file.url" alt=""
      >
      <a class="af-upload-list__item-name" @click="handleClick(file)">
        <i class="af-icon-document"></i>{{file.name}}
      </a>
      <label class="af-upload-list__item-status-label">
        <i :class="{
          'af-icon-upload-success': true,
          'af-icon-circle-check': listType === 'text',
          'af-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
        }"></i>
      </label>
      <i class="af-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
      <i class="af-icon-close-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
      <af-progress
        v-if="file.status === 'uploading'"
        :type="listType === 'picture-card' ? 'circle' : 'line'"
        :stroke-width="listType === 'picture-card' ? 6 : 2"
        :percentage="parsePercentage(file.percentage)">
      </af-progress>
      <span class="af-upload-list__item-actions" v-if="listType === 'picture-card'">
        <span
          class="af-upload-list__item-preview"
          v-if="handlePreview && listType === 'picture-card'"
          @click="handlePreview(file)"
        >
          <i class="af-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="af-upload-list__item-delete"
          @click="$emit('remove', file)"
        >
          <i class="af-icon-delete"></i>
        </span>
      </span>
    </li>
  </transition-group>
</template>
<script>
  import Locale from 'aui/src/mixins/locale';
  import AfProgress from 'aui/packages/progress';

  export default {

    name: 'AfUploadList',

    mixins: [Locale],

    data() {
      return {
        focusing: false
      };
    },
    components: { AfProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
