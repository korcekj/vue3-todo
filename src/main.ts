import { createApp } from 'vue';
import { VueQueryPlugin as vueQuery } from 'vue-query';
import router from '@/router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

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
app.use(vueQuery);
app.use(vuetify);
app.mount('#app');
