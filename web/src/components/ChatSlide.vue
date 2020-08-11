<!-- 最左边的选择框 -->
<template functional>
  <div class="sidebar">
    <div class="mycard">
      <header>
        <img :src="props.user.avatar" class="avatar" />
      </header>
      <div class="navbar">
        <a class="icon iconfont icon-msg"></a>
        <a class="icon iconfont icon-friend"></a>
        <a class="icon iconfont icon-collection"></a>
      </div>
      <footer>
        <i class="icon iconfont icon-more"></i>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSlide',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 60px;
  height: 600px;
  background: #2b2c2f;
}
.mycard {
  position: relative;
  width: 100%;
  height: 100%;
  .avatar {
    width: 36px;
    height: 36px;
    margin: 20px 12px 0 12px;
    border-radius: 2px;
  }

  .navbar {
    width: 100%;
    text-align: center;
    .icon {
      display: inline-block;
      font-size: 26px;
      margin-top: 28px;
      padding: 0 16px;
      box-sizing: border-box;
      color: rgb(173, 174, 175);
      opacity: 0.8;
      cursor: pointer;
      &.active {
        color: rgb(0, 220, 65);
      }

      &:hover {
        opacity: 1;
      }
    }

    .icon-msg,
    .icon-more {
      font-size: 22px;
      .icon-msg {
        padding: 0 19px;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
}
</style>
