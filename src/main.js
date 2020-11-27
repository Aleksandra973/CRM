import Vue from 'vue'

import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'

import './mixins'
import './plugins'
import './thirdParty'
import Antd from 'ant-design-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './scss/style.scss'
import './assets/fonts/bebasneue.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'ant-design-vue/dist/antd.css';
//import $ from 'jquery'


Vue.config.productionTip = false

Vue.use(Antd)
//Vue.use($)
Vue.use(BootstrapVue)



new Vue({
  name: 'Root',
  router,
  store,
  mounted () {
    store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
    window.addEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  },

  beforeDestroy () {
    window.removeEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  },
  render: h => h(AppLayout)
}).$mount('#app')
