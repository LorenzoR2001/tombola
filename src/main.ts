import { createApp } from 'vue/dist/vue.esm-bundler';
import './assets/main.css'
import App from './App.vue';
import './index.css'
import router from './Router/index.vue'

// Import Quasar css


createApp(App).use(router).mount('#app')



