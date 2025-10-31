import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 1. Must import the router object

const app = createApp(App);

app.use(router); // 2. Must register the router instance

app.mount('#app');
