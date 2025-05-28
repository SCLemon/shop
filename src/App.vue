<template>
  <div id="app">
    <Top></Top>
    <router-view class="view"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components:{
    Top, Footer
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

.view{
  width: 100vw;
  height: calc(100vh - 140px);
  box-sizing: border-box;
}
</style>
