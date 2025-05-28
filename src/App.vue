<template>
  <div id="app">
    <Top></Top>
    <router-view class="view"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from './components/Top.vue'
export default {
  name: 'App',
  components:{
    Top
  }
}
</script>

<style>
::-webkit-scrollbar{
  display: none;
}
#app {
  overflow: hidden;
}

</style>
