/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';
import { Form } from 'vee-validate';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import router from './router';

const app = createApp(App).use(router);
app.component('VeeForm', Form);
registerPlugins(app);

app.mount('#app');
