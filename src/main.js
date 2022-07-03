import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from "./utilities/fontawesome";
import './index.css'

const app = createApp(App)
app.use(router).component("FontAwesomeIcon", FontAwesomeIcon).mount('#app')
