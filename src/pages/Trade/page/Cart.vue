<template>
  <div class="main">123</div>
</template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
export default {
    name:'Cart',
    data(){
        return {
            status:1,
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            const res = await axios.get(`/api/cart/items?status=${this.status}`,{
                headers:{
                    'x-user-token':jsCookie.get('x-user-token')
                }
            })
            console.log(res.data)
        }
    }
}
</script>

<style scoped>
    .main{
        width: 100vw;
        height: calc(100vh - 196px);
        border: 1px solid red;
    }
</style>