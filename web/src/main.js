import Vue from 'vue';
import App from './App.vue';
import '@/style/base.css';
import '@/assets/fonts/iconfont.css';
Vue.config.productionTip = false;
import VueParticles from 'vue-particles';
Vue.use(VueParticles);
new Vue({
  render: h => h(App)
}).$mount('#app');
