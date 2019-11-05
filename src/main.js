import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueTouch from 'vue-touch'
Vue.use(VueTouch,{name: 'v-touch'});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
