
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/components/router/router";
import store from "@/components/store/index";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/css/animate.css'



// import '@/assets/css/typo.css'
// import '@/assets/css/prism.css'
// import '@/assets/css/global.css'
const app = createApp(App)

app.config.globalProperties.$key="http://localhost:8070"

app.use(router)
app.use(store)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}