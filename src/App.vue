<template>
  <div id="app">
    <!-- pc -->
    <div class="top">
      <div class="logo">
        <img src="img/logo_expand.png" alt="">
      </div>
      <div class="search">
        <input type="text" placeholder="想買什麼？這裡找！" class="search_input">
        <div class="search_btn"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
      <div class="top_item_box">
        <div class="top_item">購物首頁</div>
        <div class="top_item" v-if="0">登入 | 註冊</div>
        <template v-if="1">
          <div class="top_item">會員中心</div>
          <div class="top_item">購物列表</div>
        </template>
      </div>
    </div>

    <!-- mobile -->
    <div class="top_mobile_box">
      <div class="logo_mobile">
        <img src="img/logo.png" alt="">
      </div>
      <div class="search_mobile">
        <input type="text" placeholder="想買什麼？這裡找！" class="search_mobile_input">
        <div class="search_mobile_btn"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
      <div class="top_mobile" ref="top_mobile" @click="toggleMobileList()"><i class="fa-solid fa-bars"></i></div>
    </div>
    <div class="top_mobile_list" ref="top_mobile_list">
      <div class="top_mobile_list_item">購物首頁</div>
      <div class="top_mobile_list_item" v-if="0">登入 | 註冊</div>
      <template v-if="1">
        <div class="top_mobile_list_item">會員中心</div>
        <div class="top_mobile_list_item">購物列表</div>
      </template>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      mobile_list_open:false
    }
  },
  methods:{
    toggleMobileList(){
      this.mobile_list_open = !this.mobile_list_open;
      this.$refs['top_mobile'].classList.toggle('top_mobile_open')
      this.$refs['top_mobile_list'].classList.toggle('top_mobile_list_open')
    }
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
.top{
  width:100%;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
/* logo */
.logo{
  margin-left: 10px;
  width: 190px;
}
.logo>img{
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
}
/* search */
.search{
  width: calc(100vw - 550px);
  margin-right: 10px;
  height: 40px;
  margin-left: 20px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  padding-left: 2px;
  padding-right: 5px;
}
.search_input{
  width: 90%;
  border: 0;
  outline: 0;
}
.search_btn{
  color:rgba(0,0,0,0.7);
}
/* 選單 */
.top_item_box{
  height: 60px;
  width: 360px;
  display: flex;
  line-height: 60px;
}
.top_item{
  width: 120px;
  text-align: center;
}
.top_item:hover{
  cursor: pointer;
  background: black;
  color: white;
}
/* 500px */
.top_mobile_box{
  display: none;
}
.top_mobile_list{
  display: none;
}

/* view */
.view{
  width: 100vw;
  height: calc(100vh - 60px);
  box-sizing: border-box;
}

@media (max-width: 760px) {
  .top{
    display: none;
  }
  .top_mobile_box{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 60px;
  }
  .logo_mobile{
    width: 60px;
    height: 60px;
  }
  .logo_mobile>img{
    max-width: 100%;
    max-height: 60px;
    object-fit: contain;
  }
  /* search */
  .search_mobile{
    width: calc(100vw - 120px);
    margin-right: 10px;
    height: 40px;
    margin-left: 10px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    padding-left: 2px;
    padding-right: 5px;
  }
  .search_mobile_input{
    width: 90%;
    border: 0;
    outline: 0;
  }
  .search_mobile_btn{
    color:rgba(0,0,0,0.7);
  }

  .top_mobile{
    width: 60px;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    margin-left: auto;
  }

  .top_mobile_open{
    background-color: rgba(0,0,0,0.8);
    color: white;
  }

  .top_mobile_list{
    width: 100%;
    box-sizing: border-box;
    display: block;
    opacity: 0;
    transition: 0.3s opacity;
  }

  .top_mobile_list_open{
    opacity: 1;
  }

  .top_mobile_list_item{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: rgba(0,0,0,0.8);
    color: white;
    border-bottom: 0.8px solid white;
  }
  .top_mobile_list_item:hover{
    cursor: pointer;
    background: white;
    color: black;
  }
}
</style>
