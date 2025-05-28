import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../pages/Index/Index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Index
        },
    ]
})
router.beforeEach((to, from, next) => {
    next();
});

export default router