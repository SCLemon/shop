<template>
    <div class="main">
      <div class="list" v-for="(obj,id) in list" :key="id">
            <div class="label">{{ obj.status }}</div>
            <div class="list_img">
                <el-carousel height="120px" :autoplay="false" trigger="click" :loop="false">
                <el-carousel-item v-for="item in obj.product_image" :key="item">
                    <div class="img_box">
                    <img :src="`/api/img/download/${item}`" alt="">
                    </div>
                </el-carousel-item>
                </el-carousel>
            </div>
            <div class="list_content">
                <div class="list_title">{{ obj.product_name }}</div>
                <div class="list_detail">{{ obj.product_detail }}</div>
                <div class="list_bottom">
                    <div class="list_price">
                        ${{ obj.total_amount }}
                    </div>
                    <div class="list_bottom_right">
                        <i class="el-icon-delete trash" @click="removeItem(obj.trade_id)"></i>
                        <el-button type="primary" class="list_bottom_btn" @click="pay(obj.trade_id)">立即付款</el-button>
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
      name:'Transaction',
      data(){
          return {
              list:[]
          }
      },
      mounted(){
          this.getData();
      },
      methods:{
            async getData(){
                try{
                    const res = await axios.get(`/api/transaction/info`,{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    if(res.data.type == 'success'){
                        this.list = res.data.data;
                    }
                    else this.$bus.$emit('handleAlert','購物車資訊通知',res.data.msg, res.data.type)
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            },
            async pay(trade_id){
                try{
                    const res = await axios.put('/api/cart/transaction/pay',{
                        trade_id
                    },{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    if(res.data.type != 'success') this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            },
            async removeItem(trade_id){
                try{
                    const res = await axios.delete(`/api/transaction/delete/${trade_id}`,{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                    if(res.data.type == 'success'){
                        this.getData();
                    }
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            }
      }
  }
  </script>
  
  <style scoped>
      .main{
          width: 100vw;
          height: calc(100vh - 206px);
          overflow-y: scroll;
      }
      .list{
          width: 95vw;
          height: calc((100vh - 216px) / 4);
          margin: 0 auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          border-bottom: 1px solid rgba(210,210,210,0.3);
          position: relative;
      }
      .label{
        height: 22.5px;
        line-height: 22.5px;
        position: absolute;
        top:0;
        left:0;
        font-size: 12px;
        padding-left: 7px;
        padding-right: 7px;
        border-radius: 0 0 7px 0;
        background: chocolate;
        color: white;
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
      .mobile_right_quantity{
          display: none;
      }
  </style>