import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import App2 from './App2.vue'
import router from './router/index.js'
import axios from 'axios'

Vue.config.productionTip = false
let apiUrl = 'http://localhost:8000/api/'

if (window.location.pathname.includes('/cms')) {
  new Vue({
    vuetify,
    router,
    axios,
    apiUrl,
    render: h => h(App2)
  }).$mount('#app')
} else {
  new Vue({
    vuetify,
    router,
    axios,
    apiUrl,
    render: h => h(App)
  }).$mount('#app')
}
