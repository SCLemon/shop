<template>
  <div class="List">
    <div class="List_item">
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
    <div class="List_item">
      <div class="List_item_img">
        <el-carousel height="188px" :autoplay="false" trigger="hover" :loop="false">
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
</template>

<script>
import axios from 'axios';

export default {
  name:'Main',
  data(){
    return {
      text:''
    }
  },
  mounted(){

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
    right: 6px;
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
  ::v-deep .el-carousel{
    overflow-y: hidden;
    
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