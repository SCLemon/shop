<template>
  <div class="main">
    <el-dialog title="忘記密碼" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="請輸入使用者帳號" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off" placeholder="密碼將發送於註冊時的電子信箱"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="forgetPassword()">確定</el-button>
        </div>
    </el-dialog>
    <div class="box">
        <div class="login_title">
            <span :class="`type ${type==1?'selected_type':''}`" @click="type = 1">登入</span>｜<span :class="`type ${type==2?'selected_type':''}`" @click="type = 2">註冊</span>
        </div>
        <div class="login_info" v-if="type == 2">
            <div class="subText">使用者信箱：</div>
            <el-input v-model="email" placeholder="請輸入電子信箱" clearable></el-input>
        </div>
        <div class="login_info">
            <div class="subText">使用者帳號：</div>
            <el-input v-model="account" placeholder="請輸入帳號" clearable></el-input>
        </div>
        <div class="login_info">
            <div class="subText">使用者密碼：</div>
            <el-input v-model="password" placeholder="請輸入密碼" show-password clearable></el-input>
            <div class="forget" v-if="type == 1" @click="dialogFormVisible = true">忘記密碼？</div>
        </div>
        <div class="login_info">
            <el-button type="primary" :loading="isLoading" @click="useMethod()" class="login_btn">{{ isLoading? '驗證中...' : type==1 ?'登入':'註冊' }}</el-button>
        </div>
        <div class="version">Created By Joanna @v1.0.0</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Verify',
    data(){
        return {
            isLoading:false,
            dialogFormVisible:false,
            type:1,
            email:'',
            account:'',
            password:'',
            form:{
                account:'',
            }
        }
    },
    methods:{
        useMethod(){
            if(this.type == 1) this.login();
            else if(this.type == 2) this.register();
        },
        async login(){
            try{
                const res = await axios.post('/api/verify/login',{
                    account:this.account,
                    password: this.password
                });
                if(res.data.type == 'success'){
                    this.$router.push('/index').catch((e)=>{})
                    this.$bus.$emit('toggleTop','login')
                }
                else this.$bus.$emit('handleAlert','登入通知',res.data.msg,res.data.type)
            }
            catch(e){
                this.$bus.$emit('handleAlert','系統異常通知','請洽客服人員','error')
            }
        },
        async register(){
            try{
                const res = await axios.post('/api/verify/register',{
                    email:this.email,
                    account:this.account,
                    password: this.password
                });
                this.$bus.$emit('handleAlert','註冊通知',res.data.msg,res.data.type)
                if(res.data.type == 'success') this.type = 1;
            }
            catch(e){
                this.$bus.$emit('handleAlert','系統異常通知','請洽客服人員','error')
            }
        },
        async forgetPassword(){
            try{
                const res = await axios.post('/api/verify/forgetPassword',{
                    account:this.form.account
                });
                this.$bus.$emit('handleAlert','密碼重發通知',res.data.msg,res.data.type)
                if(res.data.type == 'success'){
                    this.dialogFormVisible = false;
                    this.form.account = '';
                }
            }
            catch(e){
                this.$bus.$emit('handleAlert','系統異常通知','請洽客服人員','error')
            }
        }
    }
}
</script>

<style scoped>
    .main{
        display: flex;
        width: 100vw;
        height: calc(100vh - 140px);
        justify-content: center;
        align-items: center;
    }
    .box{
        width: 60%;
        max-width: 720px;
        min-width: 350px;
        height: 475px;
        border-radius: 5px;
        box-shadow: 3px 4px 6px gray;
        position: relative;
    }
    .login_title{
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
        line-height: 100px;
    }
    .type{
        display: inline-block;
        cursor: pointer;
    }
    .login_info{
        width: 90%;
        margin: 0 auto;
    }
    .subText{
        line-height: 40px;
    }
    .login_btn{
        margin-top: 20px;
        width: 100%;
        background: rgb(216, 113, 38);
        border: 1px solid chocolate;
    }
    .login_btn:hover{
        background: chocolate;
        border: 1px solid chocolate;
    }
    .forget{
        line-height: 2;
        color: rgb(76, 0, 255);
        text-align: right;
        font-size: 14px;
    }
    .forget:hover{
        cursor: pointer;
        color: blue;
    }
    .version{
        position: absolute;
        width: 100%;
        height: 80px;
        line-height: 80px;
        color: rgba(210,210,210);
        text-align: center;
        bottom: 0;
        left: 0;
    }
    .type:hover{
        cursor: pointer;
    }
    .selected_type{
        color: chocolate;
    }
    ::v-deep .el-dialog{
        width: 95vw;
        max-width: 720px;
    }
</style>