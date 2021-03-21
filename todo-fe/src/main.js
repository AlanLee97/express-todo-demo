import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.use(ElementUI);


Vue.use(VueRouter);
Vue.prototype.checkIsLogin = function () {
  let userInfo = JSON.parse(JSON.stringify(sessionStorage.getItem("userInfo")));
  if (!userInfo) {
    this.$router.push("/login");
  }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
