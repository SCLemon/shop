<template>
    <div>
        <el-dialog title="新增商品" :visible.sync="addTableVisible">
            <el-upload
                class="upload-demo" drag  action="#" multiple :auto-upload="false" accept="image/*" :on-change="handleChange">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">將文件拖到此處，或<em>點擊上傳</em></div>
                <div class="el-upload__tip" slot="tip">僅開放上傳 image 且 1:1 為佳。</div>
            </el-upload>
            <div class="info">
                <div class="info_title">商品名稱</div>
                <el-input v-model="upload.name" placeholder="请輸入商品名稱"></el-input>
            </div>
            <div class="info">
                <div class="info_title">商品介紹</div>
                <el-input v-model="upload.detail" placeholder="请簡單介紹商品"></el-input>
            </div>
            <div class="numInfo">
                <div class="numInfo_item">價格：<el-input-number class="numInfo_input" v-model="upload.price" controls-position="right" :min="0"></el-input-number></div>
                <div class="numInfo_item">庫存：<el-input-number class="numInfo_input" v-model="upload.remaining" controls-position="right" :min="0"></el-input-number></div>
            </div>
            <div class="upload_btn_box"><el-button class="upload_btn" type="primary" :loading="isLoading" @click="send()">{{ isLoading?'商品創建中...':"新增商品" }}</el-button></div>
        </el-dialog>
        <div class="List_item List_add" @click="addTableVisible = true"><div><i class="fa-solid fa-plus"></i></div></div>
    </div>
</template>

<script>
import axios from 'axios'
import jsCookie from 'js-cookie';
export default {
    name:'Upload',
    data(){
        return {
            addTableVisible:true,
            isLoading:false,
            upload:{
                name:'',
                detail:'',
                price: 0,
                remaining:1,
                attachments:[],
            }
        }
    },
    methods:{
        async send(){
            this.isLoading = true;
            let formData = new FormData();
            formData.append('name',this.upload.name);
            formData.append('detail',this.upload.detail);
            formData.append('price',this.upload.price);
            formData.append('remaining',this.upload.remaining);
            for (let file of this.upload.attachments) {
                formData.append('attachments', file); // 注意同個欄位名 append 多次
            }

            try{
                const res = await axios.post('/api/product/add',formData,{
                    headers:{
                            'x-user-token': jsCookie.get('x-user-token'),
                            'Content-Type': 'multipart/form-data'
                        }
                });

                if(res.data.type == 'success'){
                    this.addTableVisible = false;
                    this.upload = {};
                }
                this.$bus.$emit('handleAlert','新增商品通知',res.data.msg,res.data.type)
            }
            catch(e){
                this.$bus.$emit('handleAlert','系統異常通知','系統異常錯誤，請洽客服人員','error')
            }
            finally{
                this.isLoading = false;
            }
        },
        handleChange(file, fileList){
            this.upload.attachments = fileList.map((item)=> item.raw)
        }
    }
}
</script>

<style scoped>
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
  .List_add{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  .info_title{
    line-height: 2.5;
  }
  ::v-deep .el-dialog{
    width: 95vw !important;
    max-width: 720px;
    margin-top: 30px !important;
  }
  ::v-deep .el-upload-dragger{
    max-width: 680px;
    width: calc(95vw - 40px);
  }
  .numInfo{
    margin-top: 20px;
  }
  .numInfo_item{
    margin-top: 20px;
  }
  .numInfo_input{
    width: calc(95vw - 83px);
    max-width: 638px;
  }
  .upload_btn_box{
    max-width: 680px;
    width: calc(95vw - 40px);
    margin-top: 20px;
  }
  .upload_btn{
    width:100%;
  }
</style>