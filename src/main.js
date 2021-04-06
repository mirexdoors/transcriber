import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRecord from '@codekraft-studio/vue-record'

Vue.use(VueRecord);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
