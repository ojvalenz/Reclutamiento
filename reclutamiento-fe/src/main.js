// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import Vue from 'vue';
import App from './App';
import router from './router/router';
import Vuetify from 'vuetify';
import vSelect from 'vue-select'; //https://github.com/sagalbot/vue-select
import { store } from './store/store';
import VuejsDialog from 'vuejs-dialog'; //https://github.com/godofbrowser/vuejs-dialog
import VeeValidate from 'vee-validate'; //https://baianat.github.io/vee-validate/guide/getting-started.html#installation
import { $http } from './utils/js/http'; //https://artemsky.github.io/vue-snotify/documentation/installation.html
import BootstrapVue from 'bootstrap-vue';
import SweetModal from 'sweet-modal-vue/src/plugin.js'; // https://sweet-modal-vue.adepto.as/
import Snotify, { SnotifyPosition } from 'vue-snotify'; //https://artemsky.github.io/vue-snotify/documentation/essentials/styling.html


import { Constants } from './utils/js/constants';
import { alert, notify } from './utils/js/helper';

import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import "vue-snotify/styles/material.css";


import './utils/css/genericos.css'

Vue.prototype.Constants = Constants;
Vue.prototype.notify = notify;
Vue.prototype.alert = alert;
Vue.prototype.$http = $http;

Vue.use(Vuetify);
Vue.use(SweetModal);
Vue.use(VuejsDialog);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);
Vue.use(Snotify, { toast: { position: SnotifyPosition.rightTop } });

Vue.config.productionTip = false

/* eslint-disable no-new */
const vueApp = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
