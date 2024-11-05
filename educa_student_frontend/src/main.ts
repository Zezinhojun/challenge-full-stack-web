/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';
import { Form } from 'vee-validate';
import './plugins/axios';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import router from './router';
import store from './store';

const app = createApp(App).use(store).use(router);
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Form', Form);
registerPlugins(app);

app.mount('#app');
