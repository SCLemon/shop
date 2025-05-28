<template>
  <div>
    <div class="dropdown">
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="edit(idx)">編輯</el-dropdown-item>
                <el-dropdown-item @click.native="remove(idx)">刪除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <el-dialog title="修改商品" :visible.sync="reviseTableVisible">
            <el-upload
                class="upload-demo" drag  action="#" multiple :auto-upload="false" accept="image/*" :on-change="handleChange" :file-list="upload.attachments">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">將文件拖到此處，或<em>點擊上傳</em></div>
                <div class="el-upload__tip" slot="tip">修改資料時，請記得重新上傳原先的圖片。</div>
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
            <div class="upload_btn_box"><el-button class="upload_btn" type="primary" :loading="isLoading" @click="revise()">{{ isLoading?'商品修改中...':"修改商品" }}</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
export default {
    name:'Dropdown',
    props:{
      idx: {
        type: String,
        default:''
      },
      item: {
        type: Object,
        default:{}
      }
    },
    
    data(){
      return {
        currentIdx:'',
        reviseTableVisible:false,
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
    watch: {
      item: {
        handler(newVal) {
          this.upload = {
            name: newVal.name || '',
            detail: newVal.detail || '',
            price: newVal.price || 0,
            remaining: newVal.remaining || 1,
            attachments: []
          };
        },
        immediate: true,
        deep: true
      }
    }
    ,
    mounted(){
      this.upload = this.item
      this.upload.attachments = [];
    },
    methods:{
      async remove(idx){
        try{
          const res = await axios.delete(`/api/product/remove/${idx}`,{
            headers:{
              'x-user-token':jsCookie.get('x-user-token')
            }
          })
          this.$bus.$emit('handleAlert','刪除商品通知',res.data.msg,res.data.type);
          if(res.data.type = 'success'){
            this.$bus.$emit('refreshProduct');
          }
        }
        catch(e){
          this.$bus.$emit('handleAlert','系統錯誤通知','系統異常錯誤，請洽客服人員。','error');
        }
      },
      async edit(idx){
        this.reviseTableVisible = true;
        this.currentIdx = idx;
      },
      async revise(){
        this.isLoading = true;
        let formData = new FormData();
        formData.append('name',this.upload.name);
        formData.append('detail',this.upload.detail);
        formData.append('price',this.upload.price);
        formData.append('remaining',this.upload.remaining);
        for (let file of this.upload.attachments) {
            formData.append('attachments', file);
        }

        try{
          const res = await axios.put(`/api/product/revise/${this.currentIdx}`,formData,{
              headers:{
                  'x-user-token': jsCookie.get('x-user-token'),
                  'Content-Type': 'multipart/form-data'
              }
          });

          if(res.data.type == 'success'){
              this.reviseTableVisible = false;
              this.upload = {
                name:'',
                detail:'',
                price: 0,
                remaining:1,
                attachments:[],
              }
              this.$bus.$emit('refreshProduct')
              this.currentIdx = '';
          }
          this.$bus.$emit('handleAlert','修改商品通知',res.data.msg,res.data.type)
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
  .dropdown{
    position: absolute;
    top: 8px;
    right: 8px;
    z-index:99;
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