import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css' // add
import 'bootstrap-vue/dist/bootstrap-vue.css' // add

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

