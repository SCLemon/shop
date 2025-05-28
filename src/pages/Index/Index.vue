<template>
  <div>
    <div class="List">
      <Upload v-if="userInfo && userInfo.level == 2"></Upload>
      <div class="List_item">
        <div class="dropdown" v-if="userInfo && userInfo.level == 2">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>編輯</el-dropdown-item>
              <el-dropdown-item>刪除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="List_item_img">
          <el-carousel height="188px" :autoplay="false" trigger="click" :loop="false">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="img_box">
                <img src="img/logo_expand.png" alt="">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="List_item_title">
          極速無線藍牙耳機｜主動降噪・長效續航「極速無線藍牙耳機｜主動降噪・長效續航」
        </div>
        <div class="List_item_price">
          $80
        </div>
        <div class="List_item_icon">
          <i title="直接購買" class="fa-solid fa-credit-card"></i>
          <i title="加入購物車" class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
import Upload from './components/Upload.vue'
export default {
  name:'Main',
  components:{
    Upload
  },
  data(){
    return {
      text:'',
      userInfo: {},
    }
  },
  mounted(){
    const info = jsCookie.get('x-user-info')
    if(info){
      const jsonPart = info.slice(info.indexOf('{'));
      const obj = JSON.parse(jsonPart);
      this.userInfo = obj
    }
  }
}
</script>

<style scoped>
  .List {
    display: grid;
    grid-template-columns: repeat(auto-fit, 188px);
    gap: 15px;
    overflow-y: scroll;
    padding: 15px;
  }
  .List_item{
    height: 275px;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
    position: relative;
    transition: 0.5s box-shadow;
  }
  .List_item:hover{
    cursor: pointer;
    box-shadow: 3px 3px 3px rgba(128, 128, 128,0.7);
  }
  .List_item_img{
    width: 100%;
    height: 188px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .img_box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 188px;
  }
  .List_item_img img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .List_item_title {
    padding-left: 8px;
    padding-right: 8px;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: justify;
  }
  .List_item_price{
    position: absolute;
    bottom: 12px;
    left:8px;
    color: chocolate;
  }
  .List_item_icon{
    position: absolute;
    bottom:12px;
    right: 3px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 60px;
    color:rgba(0,0,0,0.7);
  }
  .List_item_icon>i:hover{
    cursor: pointer;
    color:rgba(0,0,0,1);
  }
  .dropdown{
    position: absolute;
    top: 8px;
    right: 8px;
    z-index:99;
  }
  .List_add{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  ::v-deep .el-carousel{
    overflow-y: hidden;
    
  }
  ::v-deep .el-carousel__indicators{
    display: none;
  }


  @media (max-width: 420px){
    .List{
      grid-template-columns: repeat(auto-fit, 175px);
      justify-content: center;
    }
  }

  @media (max-width: 395px){
    .List{
      grid-template-columns: repeat(auto-fit, 165px);
      justify-content: center;
    }
  }
</style>