<template>
  <div style="position: relative;">
    <af-button @click="dialogVisible1 = true">点击打开 Dialog</af-button>
    <af-button type="text" @click="dialogVisible2 = true">简单的dialog</af-button>
    <div class="box" style="position: absolute;">
      AAAAAA
    </div>
    <af-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      :isDrag="false"
      size="tiny"
      bodyHeight="300px"
      :before-close="handleClose">
      <p v-for="(item, index) in 30" :key="index">这是一段信息</p>
      <span slot="footer" class="dialog-footer">
        <af-button type="primary" size="small" @click="dialogVisible1 = false">确 定</af-button>
        <af-button size="small" @click="dialogVisible1 = false">取 消</af-button>
      </span>
    </af-dialog>
    <af-dialog 
      title="23434"
      :visible.sync="dialogVisible2"
    >
      32478234
    </af-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible1: false,
        dialogVisible2: false,
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>