<template>
  <div>
    <el-dialog title="添加至購物車" :visible.sync="dialogVisible" :before-close="handleDialogClose">
      <el-input-number class="quantity" v-model="addToCartProduct.quantity" :min="1" label="描述文字"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addToCart()">確定</el-button>
      </span>
    </el-dialog>
    <el-empty v-if="(!showList.length && this.q !='') || (!showList.length && this.userInfo.level != 2)" description="暫無商品或查無此商品" class="empty"></el-empty>
    <template v-else>
        <div class="List">
          <Upload v-if="userInfo && userInfo.level == 2"></Upload>
          <div class="List_item" v-for="(obj,id) in showList" :key="id">
            <Dropdown v-if="userInfo && userInfo.level == 2" :idx="obj.uuid" :item="obj"></Dropdown>
            <div class="List_item_img">
              <el-carousel height="188px" :autoplay="false" trigger="click" :loop="false">
                <el-carousel-item v-for="item in obj.src" :key="item">
                  <div class="img_box">
                    <img :src="`/api/img/download/${item}`" alt="">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div @click="openDetail(obj)">
              <div class="List_item_title">
                {{ obj.name }}
              </div>
              <div class="List_item_remaining">剩餘 {{ obj.remaining }} 件</div>
              <div class="List_item_price">
                ${{ obj.price }}
              </div>
            </div>
            <div class="List_item_icon">
              <i title="加入購物車" class="fa-solid fa-cart-shopping" @click="openDialog(obj.uuid)"></i>
            </div>
          </div>
        </div>
    </template>

    <el-dialog title="商品介紹" :visible.sync="detailTableVisible">
      <el-carousel height="200px" :autoplay="false" trigger="click" :loop="false">
        <el-carousel-item v-for="item in detailProduct.src" :key="item">
          <div class="detail_img_box">
            <img :src="`/api/img/download/${item}`" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="detail_1">
        <div class="detail_1_title">{{ detailProduct.name }}</div>
        <div class="detail_1_region">
          <div class="detail_1_price">${{ detailProduct.price }}</div>
          <div class="detail_1_remaining">剩餘 {{ detailProduct.remaining }} 件</div>
        </div>
      </div>
      <div class="detail_2">{{ detailProduct.detail }}</div>
      <div class="detail_3"><el-button type="primary" class="detail_3_btn" @click="openDialog(detailProduct.uuid)">加入購物車</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
import Upload from './components/Upload.vue'
import Dropdown from './components/Dropdown.vue';
export default {
  name:'Main',
  components:{
    Upload, Dropdown
  },
  data(){
    return {
      q:'',
      dialogVisible:false,
      detailTableVisible:false,
      text:'',
      addToCartProduct:{
        product_uuid:'',
        quantity:1
      },
      userInfo: {},
      list:[],
      detailProduct:{

      }
    }
  },
  mounted(){
    this.$bus.$on('handleQuery', this.handleQuery)
    this.$bus.$on('refreshProduct',this.getData)
    this.getData();
    const info = jsCookie.get('x-user-info')
    if(info){
      const jsonPart = info.slice(info.indexOf('{'));
      const obj = JSON.parse(jsonPart);
      this.userInfo = obj
    }
  },
  computed:{
    showList(){
      return this.list.filter(item => item.name.includes(this.q))
    }
  },
  methods:{
    handleQuery(q){
      this.q = q;
    },
    openDetail(product){
      this.detailTableVisible = true;
      this.detailProduct = product
    },
    openDialog(product_uuid){
      const token = jsCookie.get('x-user-token');
      if(!token || token.trim()==''){
        this.$bus.$emit('handleAlert','系統提示','請先登入後再加入購物車。','error')
        this.$router.push('/verify').catch(e=>{})
        return
      }
      this.dialogVisible = true;
      this.addToCartProduct.product_uuid = product_uuid;
    },
    handleDialogClose(){
      this.dialogVisible = false;
      this.addToCartProduct = {
        product_uuid:'',
        quantity:1
      }
    },
    async getData(){
      try{
        const res = await axios.get('/api/product/get');
        if(res.data.type == 'success'){
          this.list = res.data.data.filter((item)=> item.name.includes(this.q));
        }
        else this.$bus.$emit('handleAlert','資料獲取通知',res.data.msg,res.data.type)
      }
      catch(e){
        this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
      }
    },
    async addToCart(){
      try{
        const res = await axios.post('/api/cart/add',this.addToCartProduct,
          {
            headers:{
              'x-user-token':jsCookie.get('x-user-token')
            }
          }
        );
        this.$bus.$emit('handleAlert','購物車通知',res.data.msg,res.data.type)
        if (res.data.type == 'success'){
          this.addToCartProduct = {
            uuid:'',
            quantity:1
          }
          this.dialogVisible = false;
          if(res.data.redirect) this.$router.push(res.data.redirect)
        }
      }
      catch(e){
        this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
      }
    }
  },
  beforeDestroy(){
    this.$bus.$emit('clearQuery')
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
    height: calc(100vh - 170px);
  }
  .List_item{
    height: 305px;
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
    margin-top: 10px;
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
  .List_item_remaining{
    margin-top: 10px;
    margin-right: 8px;
    font-size: 12px;
    text-align: right;
    
  }
  .List_item_icon{
    position: absolute;
    bottom:12px;
    right: 2.5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 30px;
    color:rgba(0,0,0,0.7);
  }
  .List_item_icon>i:hover{
    cursor: pointer;
    color:rgba(0,0,0,1);
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

  .quantity{
    width: 100%;
  }

  .detail_img_box{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .detail_img_box img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .detail_1{
    width: 100%;
    margin-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    box-sizing: border-box;
  }
  .detail_1_title{
    font-size: 18px;
    margin-top: 10px;
    line-height: 1.5;
    font-weight: bolder;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: justify;
  }

  .detail_1_region{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .detail_1_price{
    color: chocolate;
  }
  .detail_1_remaining{
    margin-left: auto;
  }
  .detail_2{
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    text-align: justify;
    box-sizing: border-box;
    margin-top: 5px;
    border-top: 0.1px solid rgb(210,210,210);
    padding: 8px;
    line-height: 1.5;
  }
  .detail_3{
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 15px;
    align-items: center;
  }
  .detail_3_btn{
    margin-left: auto;
  }
  ::v-deep .el-dialog{
    min-width: 355px;
  }

  @media (max-width: 420px){
    .List{
      grid-template-columns: repeat(auto-fit, 175px);
    }
  }

  @media (max-width: 395px){
    .List{
      grid-template-columns: repeat(auto-fit, 165px);
    }
  }
  .empty{
    width: 100vw;
    height: calc(100vh - 140px);
  }
</style>