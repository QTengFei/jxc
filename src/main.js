import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/font/iconfont.css'
import axios from 'axios';
import "bootstrap"
import echarts from 'echarts'

import Mint from 'mint-ui';

Vue.use(Mint);

Vue.use(Vuetify)
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    console.log(to.path);
    if (to.path !== "/" && to.path !== "/register") {
        var token = sessionStorage.getItem("token");
        if (token === null || token === undefined) {
            next('/')
        } else {
            next();
        }
    } else {
        next();
    }
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
