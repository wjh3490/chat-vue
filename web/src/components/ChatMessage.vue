<script>
/*eslint-disable */
export default {
  props: {
    msgList: Array,
    user: Object,
    currentUser: {
      type: Object,
      default: () => {
        return {
          name: '',
          sendId: ''
        };
      }
    }
  },
  data() {
    return {
      list: [
        {
          avatar: require('../assets/5.jpg'),
          name: '1',
          msg: '1323'
          // file: require('../assets/5.jpg')
        },
        {
          avatar: require('../assets/6.jpg'),
          name: '2',
          msg: 'derbdf'
          // file: require('../assets/6.jpg')
        }
      ]
    };
  },
  watch: {
    msgList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$refs.item.scrollIntoView(false);
        });
      }
    }
  },
  render() {
    const otherBox = item => (
      <section class="message-item" ref="item">
        <div class="main other">
          <img class="avatar" width="36" height="36" src={item.avatar} />
          <div class="content">
            <div class="name">{item.name}</div>
            {item.msg && <div class="text"  domPropsInnerHTML={item.msg}>{item.msg}</div>}
            {item.file && <img src={item.file} alt="" ref="img" class="img" />}
          </div>
        </div>
      </section>
    );

    const selfBox = item => (
      <section class="message-item" ref="item">
        <div class="main self">
          {item.msg && <div class="content"  domPropsInnerHTML={item.msg}>{item.msg}</div>}
          {item.file && <img src={item.file} alt="" ref="img" class="img" />}
          <img class="avatar" width="36" height="36" src={item.avatar} />
        </div>
      </section>
    );

    const msg = this.msgList.map(
      item => (item.name === this.user.name ? selfBox(item) : otherBox(item))
    );

    return (
      <div class="message">
        <header class="header">
          <div class="friendname">{this.currentUser.name}</div>
        </header>
        <div class="message-wrapper" ref="list">
          <div>{msg}</div>
        </div>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.img {
  width: 120px;
  height: 150px;
}

.message {
  width: 100%;
  height: 450px;
  .header {
    height: 60px;
    padding: 28px 0 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    .friendname {
      font-size: 18px;
    }
  }
  .message-wrapper {
    min-height: 390px;
    max-height: 390px;
    padding: 10px 15px;
    box-sizing: border-box;
    overflow-y: auto;
    border-bottom: 1px solid #e7e7e7;
  }
  .message {
    margin-bottom: 15px;
  }
  .message-item {
    padding: 30px 0;
  }
  // .time {
  //   width: 100%;
  //   font-size: 12px;
  //   margin: 7px auto;
  //   text-align: center;
  // }

  .avatar {
    // float: left;
    vertical-align: top;
    display: inline-block;
    margin-left: 15px;
    border-radius: 3px;
    width: 36px;
    height: 36px;
  }
  .name {
    line-height: 7px;
    font-size: 12px;
    color: #a29b9b;
    margin-bottom: 10px;
  }

  .main {
    text-align: left;
  }
  .self {
    text-align: right;
  }
}
.content {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  position: relative;
  max-width: 330px;
  min-height: 36px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 4px;
  text-align: left;
  padding: 4px 6px;
  word-break: break-all;
}
.self {
  .content {
    background-color: #b2e281;
    text-align: left;
    padding: 4px 6px;
    word-break: break-all;
    &::before {
      content: '';
      right: 0px;
      transform: translateX(100%);
      position: absolute;
      top: 11px;
      border: 6px solid transparent;
      border-left-color: #b2e281;
    }
  }
}
.other {
  .text {
    background-color: #fff;
    padding: 4px 6px;
    word-break: break-all;
    border-radius: 4px;
    &::before {
      content: '';
      left: 6px;
      transform: translateX(-100%);
      position: absolute;
      top: 28px;
      border: 6px solid transparent;
      border-right-color: #fff;
    }
  }
}
</style>
