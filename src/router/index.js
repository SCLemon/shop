import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../pages/Index/Index.vue'
import Verify from '../pages/Verify/Verify.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/index',
            component:Index
        },
        {
            path:'/verify',
            component:Verify
        },
        {
            path:'/',
            redirect:'/index'
        },
    ]
})
router.beforeEach((to, from, next) => {
    next();
});

export default router