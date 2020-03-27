export default function(ref) {
  return {
    methods: {
      // 触发表单focus事件
      focus() {
        this.$refs[ref].focus();
      }
    }
  };
};
