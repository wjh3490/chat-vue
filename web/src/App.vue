<template>
  <div id="app" class="clearfix">
    <!--  -->
    <chat-login v-show="visible" @login="login" />
    <div class="container" v-show="!visible">
      <!--  -->
      <chat-slide :user="user" />
      <div class="main">
        <div class="content">
          <div class="msglist">
            <!--  -->
            <chat-search />
            <!--  -->
            <chat-list
              :userList="userList"
              @rooms="getRooms"
              :currentUser="currentChatUser"
            />
          </div>
          <template>
            <div class="chatbox" v-if="userList.length >= 1">
              <!--  -->
              <chat-message
                :msgList="msgList"
                :user="user"
                :currentUser="currentChatUser"
              />
              <!--  -->
              <chat-send-box @send="send" @sendFile="sendFile" />
            </div>
            <!--  -->
            <chat-none v-else />
          </template>
        </div>
      </div>
    </div>

    <!-- <vue-particles
      color="#6495ED"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#6495ED"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particles"
    >
    </vue-particles> -->
  </div>
</template>

<script>
/*eslint-disable */

import ChatSlide from './components/ChatSlide.vue';
import ChatSearch from '@/components/ChatSearch.vue';
import ChatList from '@/components/ChatList.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatSendBox from '@/components/ChatSendBox.vue';
import ChatLogin from '@/components/ChatLogin.vue';
import ChatNone from '@/components/ChatNone.vue';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
export default {
  name: 'App',
  components: {
    ChatSlide,
    ChatSearch,
    ChatList,
    ChatMessage,
    ChatSendBox,
    ChatLogin,
    ChatNone
  },
  data() {
    return {
      visible: true,

      id: '',

      userList: [],
      msgList: [],
      user: {
        name: '',
        avatar: ''
      },
      currentChatUser: {
        name: '',
        sendId: ''
      }
    };
  },
  computed: {},
  mounted() {
    socket.on('loginError', data => alert(data));

    socket.on('loginSuccess', data => {
      this.user = data;
      this.visible = false;
    });

    socket.on('userList', data => {
      const list = data.filter(item => item.name !== this.user.name);
      this.currentChatUser = list[0];
      this.userList = list;
    });

    socket.on('receiveMsg', list => (this.msgList = list));

    socket.on('receiveList', list => (this.msgList = list));

    socket.on('receiveFile', list => (this.msgList = list));

    socket.on('userQuit', data => {
      const list = data.filter(item => item.name !== this.user.name);
      this.currentChatUser = list[0] ? list[0] : { name: '', sendId: '' };
      this.userList = list;
    });
  },
  methods: {
    send(msg) {
      const o = {
        msg,
        receivedId: this.currentChatUser.sendId,
        date: +new Date()
      };
      const info = this.contactObject(o);
      socket.emit('sendMsg', info);
    },
    login(user) {
      socket.emit('login', user);
    },
    getRooms(c) {
      if (this.currentChatUser.sendId === c.sendId) return;
      this.currentChatUser = c;
      const info = this.contactObject({ receivedId: c.sendId });
      socket.emit('messageList', info);
    },
    sendFile(files) {
      const info = this.contactObject(files, {
        receivedId: this.currentChatUser.sendId,
        date: +new Date()
      });
      socket.emit('sendFile', info);
    },
    contactObject(o1 = {}, o2 = {}) {
      return Object.assign({}, this.user, o1, o2);
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(./assets/s2.jpg);
  background-size: 100% 100%;
}
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.container {
  position: relative;
  z-index: 1004;
  background-color: #fff;
  display: flex;
  border-radius: 50px;
  margin: 20px auto;
  width: 860px;
  height: 600px;
}
.main {
  flex: 1;
  height: 600px;
  background: #f2f2f2;
}
.content {
  display: flex;
  width: 800px;
  .msglist {
    width: 250px;
    background: rgb(230, 230, 230);
  }
  .chatbox {
    flex: 1;
  }
}
</style>
