import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', component: () => import('./components/login.vue')},
        {path: '/Register', component: () => import('./components/register.vue')},

        {
            path: "/navbar",
            component: () => import('./components/navbar.vue'),
            children: [
                {
                    path: '/Homepage',
                    component: () => import('./components/homepage.vue'),
                },
                {
                    path: '/Center',
                    component: () => import('./components/center.vue')
                },
                {
                    path: '/CenterTwo',
                    component: () => import('./components/centerTwo.vue')
                },
                {
                    path: '/CenterThree',
                    component: () => import('./components/centerThree.vue')
                },
                {
                    path: '/Money',
                    component: () => import('./components/money.vue')
                },

                {
                    path: '/Apply',
                    component: () => import('./components/apply.vue')
                },
                {
                    path: '/Record',
                    component: () => import('./components/record.vue')
                },
                {
                    path: '/Input',
                    component: () => import('./components/input.vue')
                },

                {
                    path: '/Query',
                    component: () => import('./components/query.vue')
                },
                {
                    path: '/File',
                    component: () => import('./components/file.vue')
                },
                {path: '/Delivery', component: () => import('./components/delivery.vue')},
                {path: '/Purchase', component: () => import('./components/purchase.vue')},
                {path: '/EchartsOne', component: () => import('./components/EchartsOne.vue')},
                {path: '/EchartsTwo', component: () => import('./components/EchartsTwo.vue')},
                {path: '/EchartsThree', component: () => import('./components/EchartsThr.vue')},
                {path: '/Search', component: () => import('./components/search.vue')},
                {path: '/Detail', component: () => import('./components/detail.vue')},
                {path: '/Ordinary', component: () => import('./components/ordinary.vue')},
                {path: '/ExcelOne', component: () => import('./components/excelOne.vue')},
                {path: '/ExcelTwo', component: () => import('./components/excelTwo.vue')},
                {path: '/ExcelThree', component: () => import('./components/excelThree.vue')},
                {path: '/dataPrice', component: () => import('./components/dataPrice.vue')},
            ]
        },


    ],

    // mode: 'history'
})