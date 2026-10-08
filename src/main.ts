import { createApp } from 'vue'
import App from './App.vue'

// @ts-expect-error Vite resolves CSS side-effect imports at runtime.
import '@/styles/globals.css'

createApp(App).mount('#app')
