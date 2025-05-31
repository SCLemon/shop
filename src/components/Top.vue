<template>
  <div>
      <!-- pc -->
      <div class="top">
        <div class="logo" @click="goTo('1','/index')">
          <img src="img/logo_expand.png" alt="">
        </div>
        <div class="search">
          <input type="text" :placeholder="'想買什麼？這裡找！'" class="search_input" v-model="q" @input="handleSearch()">
          <div class="search_btn"><i class="fa-solid fa-magnifying-glass"></i></div>
        </div>
        <div class="top_item_box">
          <div :class="`top_item ${$route.path.includes('/index')?'top_item_current_page':''}`" @click="goTo('1','/index')">購物首頁</div>
          <div :class="`top_item ${$route.path.includes('/verify')?'top_item_current_page':''}`" v-if="!isLogin"  @click="goTo('1','/verify')">登入 | 註冊</div>
          <template v-else>
            <div :class="`top_item ${$route.path.includes('/trade')?'top_item_current_page':''}`"  @click="goTo('1','/trade')">交易列表</div>
            <div :class="`top_item ${$route.path.includes('/member')?'top_item_current_page':''}`"  @click="logout()">登出</div>
          </template>
        </div>
      </div>

    <!-- mobile -->
    <div class="top_mobile_box">
      <div class="logo_mobile"  @click="goTo('1','/index')">
        <img src="img/logo.png" alt="">
      </div>
      <div class="search_mobile">
        <input type="text" placeholder="想買什麼？這裡找！" class="search_mobile_input" v-model="q" @input="handleSearch()">
        <div class="search_mobile_btn"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
      <div class="top_mobile" ref="top_mobile" @click="toggleMobileList()"><i class="fa-solid fa-bars"></i></div>
    </div>
    <div class="top_mobile_list" ref="top_mobile_list">
      <div class="top_mobile_list_item"  @click="goTo('2','/index')">購物首頁</div>
      <div class="top_mobile_list_item" v-if="!isLogin"  @click="goTo('2','/verify')">登入 | 註冊</div>
      <template v-else>
        <div class="top_mobile_list_item"  @click="goTo('2','/trade')">交易列表</div>
        <div class="top_mobile_list_item"  @click="logout()">登出</div>
      </template>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie'
export default {
    name:'Top',
    data(){
        return {
          q:'',
          isLogin:false,
          mobile_list_open:false,
        }
    },
    mounted(){
      this.$bus.$on('toggleTop', this.toggleTop)
      this.$bus.$on('clearQuery', this.clearQuery)
      this.checkIsLogin();
    },
    watch:{
      q:{
        handler(){
          this.$bus.$emit('handleQuery',this.q)
          if(!this.$route.fullPath.includes('index') && this.q != '') this.$router.push('/index').catch(e=>{})
        }
      }
    },
    methods:{
        clearQuery(){
          this.q = '';
        },
        logout(){
          jsCookie.remove('x-user-token');
          jsCookie.remove('x-user-info');
          this.toggleTop('logout');
          this.$router.push('/verify').catch(e=>{});
          // location.reload();
        },
        goTo(type,path){
          if(type == 1){
            this.$router.push(path).catch(e=>{});
          }
          else if(type == 2 && this.mobile_list_open){
            this.$router.push(path).catch(e=>{});
            this.toggleMobileList();
          }
        },
        toggleMobileList(){
          this.mobile_list_open = !this.mobile_list_open;
          this.$refs['top_mobile'].classList.toggle('top_mobile_open')
          this.$refs['top_mobile_list'].classList.toggle('top_mobile_list_open')
        },
        // 登入或登出時，調整 Top 顯示項目
        toggleTop(type){
          if(type == 'login') this.isLogin = true;
          else if(type == 'logout') this.isLogin = false
        },
        // 預渲染列表顯示
        checkIsLogin(){
          const token = jsCookie.get('x-user-token')
          if(token && token.trim()!='') this.isLogin = true;
        }
    }
}
</script>

<style scoped>
  .top{
    width:100%;
    height: 70px;
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
    max-height: 70px;
    object-fit: contain;
  }
  .logo:hover{
    cursor: pointer;
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
    height: 70px;
    width: auto;
    display: flex;
    line-height: 70px;
  }
  .top_item{
    width: 120px;
    text-align: center;
    margin-right: 1px;
    /* 動畫底線設定 */
    background-image: linear-gradient(to right, chocolate 0%, chocolate 100%);
    background-size: 0% 2.5px;
    background-repeat: no-repeat;
    background-position: bottom left;
    transition: background-size 0.3s ease;
  }
  .top_item:hover{
    cursor: pointer;
    background-size: 100% 2.5px;
  }
  .top_item_current_page{
    background-image: linear-gradient(to right, chocolate 0%, chocolate 100%);
    background-size: 100% 2.5px;
  }
  /* 500px */
  .top_mobile_box{
    display: none;
  }
  .top_mobile_list{
    display: none;
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
      height: 70px;
    }
    .logo_mobile{
      width: 70px;
      height: 70px;
    }
    .logo_mobile>img{
      max-width: 100%;
      max-height: 70px;
      object-fit: contain;
    }
    .logo_mobile:hover{
      cursor: pointer;
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
      width: 80%;
      border: 0;
      outline: 0;
    }
    .search_mobile_btn{
      color:rgba(0,0,0,0.7);
    }

    .top_mobile{
      width: 70px;
      height: 70px;
      font-size: 24px;
      line-height: 70px;
      text-align: center;
      margin-left: auto;
      transition: 0.75s all;
    }
    .top_mobile:hover{
      cursor: pointer;
    }
    .top_mobile_open{
      background-color: rgba(0,0,0,0.8);
      color: white;
    }

    .top_mobile_list{
      margin-top: 1px;
      width: 50%;
      box-sizing: border-box;
      position: absolute;
      display: block;
      right: -50%;
      z-index: 100;
      transition: 0.75s right;
    }

    .top_mobile_list_open{
      right: 0%;
    }

    .top_mobile_list_item{
      width: 100%;
      height: 70px;
      line-height: 70px;
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