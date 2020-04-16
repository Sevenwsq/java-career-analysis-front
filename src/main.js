import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
Vue.use(ElementUI);
Vue.use(echarts);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
