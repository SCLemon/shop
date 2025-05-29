<template>
  <div class="main">
    <div class="list" v-for="(obj,id) in list" :key="id">
        <div class="list_img">
            <el-carousel height="120px" :autoplay="false" trigger="click" :loop="false">
            <el-carousel-item v-for="item in obj.src" :key="item">
              <div class="img_box">
                <img :src="`/api/img/download/${item}`" alt="">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="list_content">
            <div class="list_title">{{ obj.name }}</div>
            <div class="list_detail">{{ obj.detail }}</div>
            <div class="list_bottom">
                <div class="list_price">
                    ${{ obj.price }}
                    <i class="el-icon-delete trash"></i>
                </div>
                <div class="list_bottom_right">
                    <el-input-number v-model="obj.quantity" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                    <el-button type="primary" class="list_bottom_btn">立即付款</el-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
export default {
    name:'Cart',
    data(){
        return {
            status:1,
            list:[]
        }
    },
    mounted(){
        this.getData();
        /*
            {
                "id": 7,
                "trade_id": "3cabe842-cff1-489d-8235-ad09c5c1ba9a",
                "product_uuid": "e1ccf1e0-37ea-40ac-b5ca-b89257fea4ce",
                "quantity": 1,
                "status": 1,
                "name": "MySQL 版本太低，不支援 JSON  你用的 ORM 或資料庫驅動不支援自動解析 JSON 欄位  你在 Node.js 拿到的 p.src 是字串（JSON 格式的字串）",
                "price": 1999,
                "detail": "MySQL 版本太低，不支援 JSON  你用的 ORM 或資料庫驅動不支援自動解析 JSON 欄位  你在 Node.js 拿到的 p.src 是字串（JSON 格式的字串），需用 JSON.parse(p.src) 轉成物件再用  SQL 語法錯誤，導致查詢失敗",
                "src": [
                    "1829ad9c-feec-4711-be33-533959b39ea0.png"
                ]
            }
        */
    },
    methods:{
        async getData(){
            try{
                const res = await axios.get(`/api/cart/items?status=${this.status}`,{
                    headers:{
                        'x-user-token':jsCookie.get('x-user-token')
                    }
                })
                if(res.data.type == 'success'){
                    this.list = res.data.data
                }
                else this.$bus.$emit('handleAlert','購物車資訊通知',res.data.msg, res.data.type)
            }
            catch(e){
                his.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
            }
        }
    }
}
</script>

<style scoped>
    .main{
        width: 100vw;
        height: calc(100vh - 196px);
        overflow-y: scroll;
    }
    .list{
        width: 95vw;
        height: calc((100vh - 196px) / 4);
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-bottom: 1px solid rgba(210,210,210,0.3);
    }
    .list_img{
        width: 120px;
        height: 120px;
    }
    .list_content{
        width: calc(95vw - 150px);
        height: 120px;
        margin-left: 10px;
        position: relative;
    }
    .img_box{
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img_box img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .list_title{
        width: 100%;
        line-height: 35px;
        font-weight: bolder;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .list_detail{
        font-size: 12px;
        color: gray;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .list_bottom{
        width: 100%;
        position: absolute;
        bottom: 0px;
        height: 40px;
        display: flex;
        align-items: center;
    }
    .list_price{
        font-size: 14px;
    }
    .list_bottom_right{
        margin-left: auto;
    }
    .list_bottom_btn{
        margin-left: 20px;
    }
    .trash{
        color: red;
        margin-left: 5px;
    }
    .trash:hover{
        cursor: pointer;
    }
</style>