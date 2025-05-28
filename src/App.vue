<template>
  <div id="app" class="app">
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
  },
  mounted(){
    this.$bus.$on('handleAlert',this.handleAlert)
  },
  methods:{
    handleAlert(title,msg,type){
      this.$notify({
          title: title,
          message: msg,
          type: type
      });
    }
  }
}
</script>

<style>
::-webkit-scrollbar{
  display: none;
}
.app {
  position: relative;
  overflow-x: hidden;
}

.view{
  width: 100vw;
  height: calc(100vh - 140px);
  box-sizing: border-box;
}
</style>
