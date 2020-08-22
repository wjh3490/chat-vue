<template>
  <div class="login-container">
    <div class="some-space">
      <div class="form">
        <h2>VueChat</h2>
        <div class="item">
          <i class="iconfont icon-user"></i>
          <input
            autocomplete="off"
            type="text"
            class="input"
            v-model="user.name"
            placeholder="请输入用户名"
          />
        </div>
        <div>
          <label for="file" class="avatar">
            <span class="avatar-name">选择头像</span>
            <img :src="url" alt="" class="avatar-img" />
            <input type="file" id="file" ref="file" @change="handleFile" />
          </label>
        </div>
        <button class="loginBtn" @click="handleLogin">
          立即登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable  */
export default {
  name: 'ChatLogin',
  data() {
    return {
      user: {
        name: '',
        file: '',
        suffix: ''
      },
      url: require('../assets/888.jpg')
    };
  },
  methods: {
    handleFile(e) {
      let file = e.target.files[0];
      let suffix = file.type.split('/').pop();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.url = e.target.result;
        this.user.file = file;
        this.user.suffix = suffix;
      };
    },
    handleLogin() {
      if (!this.user.name || !this.user.file) return;
      this.$emit('login', this.user);
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .some-space {
    color: white;
    font-weight: 100;
    letter-spacing: 2px;
    transform: translate3d(0px, 100px, 0);
    .form {
      width: 460px;
      height: auto;
      background: rgba(36, 36, 85, 0.5);
      margin: 0 auto;
      padding: 35px 30px 25px;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        border-bottom: 1px solid #d3d7f7;
        i {
          color: #d3d7f7;
          margin-right: 10px;
        }
      }
      h2 {
        text-align: center;
        font-weight: normal;
        font-size: 26px;
        color: #d3d7f7;
        padding-bottom: 35px;
      }
      .input {
        font-size: 16px;
        line-height: 30px;
        width: 100%;
        color: #d3d7f7;
        outline: none;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding: 10px 0;
      }
      .loginBtn {
        width: 100%;
        padding: 12px 0;
        border: 1px solid #d3d7f7;
        font-size: 16px;
        color: #d3d7f7;
        cursor: pointer;
        background: transparent;
        border-radius: 4px;
        margin-top: 10px;
        &:hover {
          color: #fff;
          background: #0090ff;
          border-color: #0090ff;
        }
      }
      .tip {
        font-size: 12px;
        padding-top: 20px;
      }
    }
  }
}

input::-webkit-input-placeholder {
  color: #d3d7f7;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d3d7f7;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d3d7f7;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d3d7f7;
}
#file {
  display: none;
}
.avatar {
  &-img {
    width: 300px;
    height: 180px;
    display: inline-block;
    vertical-align: middle;
  }
  &-name {
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
}
</style>
