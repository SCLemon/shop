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
                        <i class="el-icon-delete trash" @click="removeItem(obj.trade_id)" v-if="obj.status == '未付款' && userInfo.token == obj.token"></i>
                        <template v-if="userInfo.level == 1">
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '未付款'" @click="pay(obj.trade_id)">立即付款</el-button>
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '已發貨'" @click="finishOrder(obj.trade_id)">完成訂單</el-button>
                        </template>
                        <template v-if="userInfo.level == 2">
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '未付款' && userInfo.token != obj.token" @click="pay(obj.trade_id)" :disabled="userInfo.token != obj.token">立即付款</el-button>
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '確認中'" @click="checkPay(obj.trade_id)">確認已付款</el-button>
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '已付款'" @click="shipping(obj.trade_id)">進行發貨</el-button>
                            <el-button type="primary" class="list_bottom_btn" v-if="obj.status == '已發貨' && userInfo.token != obj.token" @click="finishOrder(obj.trade_id)" :disabled="userInfo.token != obj.token">完成訂單</el-button>
                        </template>
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
                list:[],
                userInfo:{}
          }
      },
      mounted(){
            const info = jsCookie.get('x-user-info')
            const token = jsCookie.get('x-user-token')
            if(info && token){
                const jsonPart = info.slice(info.indexOf('{'));
                const obj = JSON.parse(jsonPart);
                this.userInfo = obj
                this.userInfo.token = token;
            }
            else{
                this.$router.push('/verify').catch(e=>{})
                this.$bus.$emit('handleAlert','購物車資訊通知','請先登入再查看購物車','error')
            }
            this.getData();
      },
      methods:{
            async getData(){
                try{
                    let url = this.userInfo.level == 1? '/api/transaction/info':this.userInfo.level == 2?'/api/transaction/infoByManager':''
                    const res = await axios.get(url,{
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
                    const res = await axios.put('/api/transaction/pay',{
                        trade_id
                    },{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                    this.getData();
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            },
            async checkPay(trade_id){
                try{
                    const res = await axios.put('/api/transaction/check',{
                        trade_id
                    },{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                    this.getData();
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            },
            async shipping(trade_id){
                try{
                    const res = await axios.put('/api/transaction/shipping',{
                        trade_id
                    },{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                    this.getData();
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
            },
            async finishOrder(trade_id){
                try{
                    const res = await axios.put('/api/transaction/finish',{
                        trade_id
                    },{
                        headers:{
                            'x-user-token':jsCookie.get('x-user-token')
                        }
                    })
                    this.$bus.$emit('handleAlert','訂單交易通知',res.data.msg, res.data.type)
                    this.getData();
                }
                catch(e){
                    this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員。','error')
                }
            },

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