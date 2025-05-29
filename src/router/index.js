import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../pages/Index/Index.vue'
import Verify from '../pages/Verify/Verify.vue'
import Trade from '../pages/Trade/Trade.vue'
import Cart from '../pages/Trade/page/Cart.vue'
import Transaction from '../pages/Trade/page/Transaction.vue'
import Finish from '../pages/Trade/page/Finish.vue'
import jsCookie from 'js-cookie'
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
            path:'/trade',
            component:Trade,
            children:[
                {
                    path:'cart',
                    component: Cart
                },
                {
                    path:'transaction',
                    component: Transaction
                },
                {
                    path:'finish',
                    component: Finish
                },
                {
                    path:'',
                    redirect:'cart'
                }
            ]
        },
        {
            path:'/',
            redirect:'/index'
        },
    ]
})

import axios from 'axios'
router.beforeEach(async (to, from, next) => {
    
    if(to.path.includes('/index') || to.path.includes('/verify')) next();
    else {
        const token = jsCookie.get('x-user-token')
        try{
            const res = await axios.get('/api/verify/check',{
                headers:{
                    'x-user-token':token
                }
            })
            if(res.data.type == 'success') next();
            else {
                next('/verify')
                location.reload();
            }
        }
        catch(e){
            console.log(e)
            alert('系統異常錯誤，請洽客服人員。')
        }
    }
    
});

export default router