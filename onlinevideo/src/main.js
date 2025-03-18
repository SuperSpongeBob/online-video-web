import { createApp } from 'vue'
 import './style.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import  router  from './router'
// import Vant from 'vant'
import 'vant/lib/index.css'
// import VueParticles from 'vue-particles'
import ParticleBackground from './components/ParticleBackground.vue'
import App from './App.vue'

// createApp(App).mount('#app')
const app=createApp(App)
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
app.component('ParticleBackground',ParticleBackground)
app.use(ElementPlus)
// app.use(VueParticles)
app.use(router)
// app.use(Vant)
app.mount('#app')
