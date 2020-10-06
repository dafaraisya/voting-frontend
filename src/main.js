import Vue from 'vue'
import App from './App.vue'
import {router,store} from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Editor from "vue2-editor";

Vue.use(BootstrapVue)
Vue.use(Vue2Editor);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
