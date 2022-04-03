import Vue from 'vue';

import VeeValidate from 'vee-validate';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import createStore from '@/store';
import router from '@/router/RouterConfig';
import App from './App.vue';
import '@/assets/style.scss';
import './registerServiceWorker';
import '@/components/common/Toasted';
import './interceptors/helpers';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Loading);

export const store = createStore();
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


