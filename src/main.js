import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'

import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueSession)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')