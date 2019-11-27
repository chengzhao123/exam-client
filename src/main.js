import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import back from './back'
import qs from 'qs'
import $ from'jquery'
import store from './store/login.js'
import vueHtml5plus from 'vue-html5plus'
Vue.config.productionTip = false
Vue.prototype.$qs=qs
Vue.prototype.$axios=axios
Vue.use(Mint)
Vue.use(vueHtml5plus)
new Vue({
  router,
  back,
  store,
  render: h => h(App)
}).$mount('#app')
