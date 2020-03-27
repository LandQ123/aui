<template>
  <div>
    <p>message-box</p>
    <section>
      <af-button @click="handleClick1">msgbox</af-button>
      <af-button @click="handleClick2">confirm</af-button>
      <af-button @click="handleClick3">alert</af-button>
    </section>
    <p>message</p>
    <section>
      <af-button :plain="true" @click="open1">成功</af-button>
      <af-button :plain="true" @click="open2">消息</af-button>
      <af-button :plain="true" @click="open3">疑问</af-button>
      <af-button :plain="true" @click="open4">警告</af-button>
      <af-button :plain="true" @click="open5">错误</af-button>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    handleClick1() {
       const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          reverseButtonPosition: true,
          center: true,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
    },
    handleClick2() {
       this.$confirm('间隔比项目与边框的间隔大一倍, 是否继续?', '提示', {
          messageTitle: '这是消息标题',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleClick3() {
      this.$alert('这是一段内容,确定删除吗', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    open1() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        duration: 0,
        type: 'success'
      });
    },

    open2() {
      this.$message({
        messageTitle: '提示',
        message: '提示哦，这是一条提示消息'
      });
    },

    open3() {
      this.$message({
        messageTitle: '确认',
        message: '确认哦，这是一条确认消息',
        type: 'question'
      });
    },

    open4() {
      this.$message({
        messageTitle: '警告',
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      });
    },

    open5() {
      this.$message({
        messageTitle: '错误',
        message: '错了哦，这是一条错误消息',
        type: 'error'
      });
    }
  }
}
</script>
<style>

</style>
