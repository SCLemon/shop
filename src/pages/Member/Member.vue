<template>
  <div class="main">
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
    name:'Member',
    methods:{
        logout(){
            jsCookie.remove('x-user-token');
            jsCookie.remove('x-user-info');
            this.$bus.$emit('toggleTop','logout');
            this.$router.push('/index').catch(e=>{});
        }
    }
}
</script>

<style scoped>
    .main{
        width:100vw;
        height: calc(100vh - 140px);
    }
</style>