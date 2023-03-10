import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import router from '@/router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';

import App from '@/App.vue';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin);
app.use(Vue3Toastify, {
  autoClose: 2000,
});
app.mount('#app');
