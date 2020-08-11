<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul>
      <li
        class="sessionlist"
        :class="{ active: currentUser.sendId === item.sendId }"
        v-for="(item, index) in userList"
        :key="index"
        @click="$emit('rooms', item)"
      >
        <div class="list-left">
          <img class="avatar" width="42" height="42" :src="item.avatar" />
        </div>
        <div class="list-right">
          <p class="name">{{ item.name }}</p>
          <!-- <span class="time">{{ currentMsg.date }}</span>
          <p class="lastmsg">{{ currentMsg.msg }}</p> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  props: {
    userList: {
      type: Array,
      default: () => []
    },

    currentUser: {
      type: Object,
      default: () => {
        return {
          sendId: '',
          name: ''
        };
      }
    },
    currentMsg: {
      type: Object,
      default: () => {
        return {
          date: '',
          msg: ''
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.msglist {
  height: 540px;
  overflow-y: auto;
  .sessionlist {
    display: flex;
    padding: 12px;
    transition: background-color 0.1s;
    font-size: 0;
    &:hover {
      background-color: rgb(220, 220, 220);
    }
    &.active {
      background-color: #c4c4c4;
    }
  }
  .avatar {
    display: inline-block;
    width: 42px;
    height: 42px;
    border-radius: 2px;
    margin-right: 12px;
  }
  .list-right {
    position: relative;
    flex: 1;
    margin-top: 4px;
  }
  .name {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }
  .time {
    float: right;
    color: #999;
    font-size: 10px;
    vertical-align: top;
  }
  .lastmsg {
    position: absolute;
    font-size: 12px;
    width: 130px;
    height: 15px;
    line-height: 15px;
    color: #999;
    bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
