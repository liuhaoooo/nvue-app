import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import { router } from "@/common/router.js"
import request from "@/common/request.js"
import store from '@/store/index.js'

Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$request = request;
Vue.prototype.$router = router;
Vue.prototype.$store = store;

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif