<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji-box">
      <label for="fileimg">
        <input type="file" id="fileimg" @change="handleChange" />
        <span class="icon iconfont icon-wenjian"></span>
      </label>
    </div>
    <twemoji-textarea
      :emojiData="emojiDataAll"
      :emojiGroups="emojiGroups"
      ref="emoji"
      @enterKey="handleSend"
      @contentChanged="t => (content = t)"
      :pickerWidth="550"
      :pickerArrowEnabled="false"
    >
      <template #twemoji-picker-button>
        <span class="icon iconfont icon-xiaolian"></span>
      </template>
    </twemoji-textarea>
    <div class="send" @click="handleSend">
      <span>发送(sent)</span>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { TwemojiTextarea } from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';
export default {
  name: 'ChatSendBox',
  components: { TwemojiTextarea },
  data() {
    return {
      content: '',
      files: {
        file: '',
        suffix: ''
      }
    };
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  methods: {
    handleSend() {
      if (!this.content.length) return;
      this.$emit('send', this.content);
      this.$refs.emoji.cleanText();
      this.content = '';
    },
    handleChange(e) {
      console.log(1111);

      let file = e.target.files[0];
      let suffix = file.type.split('/').pop();
      this.files = {
        file,
        suffix
      };
      this.$emit('sendFile', this.files);
    }
  }
};
</script>

<style lang="less" scoped>
#fileimg {
  display: none;
}
.text {
  position: relative;
  height: 150px;
  background: #fff;
  .emoji-box {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    padding: 0 30px;
    box-sizing: border-box;
    color: #7c7c7c;
  }
  .icon-xiaolian {
    cursor: pointer;
    position: absolute;
    top: -32px;
    left: 12px;
    font-size: 20px;
    &:hover {
      color: #1aad19;
    }
  }
  .emojiBox {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    top: -210px;
    left: -100px;
    width: 300px;
    height: 200px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px #d1d1d1;
    &.showbox-enter-active,
    &.showbox-leave-active {
      transition: all 0.5s;
    }
    &.showbox-enter,
    &.showbox-leave-active {
      opacity: 0;
    }
  }
  textarea {
    box-sizing: border-box;
    padding: 0 30px;
    height: 110px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
  }

  .send {
    position: absolute;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;
    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }
  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;
    &.appear-enter-active,
    &.appear-leave-active {
      transition: all 1s;
    }
    &.appear-enter,
    &.appear-leave-active {
      opacity: 0;
    }
    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}
.icon-wenjian {
  display: inline-block;
  margin-left: 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
