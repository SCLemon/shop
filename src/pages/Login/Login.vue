<template>
  <div class="main">
    <div class="box">
        <div class="login_title">登入｜註冊</div>
        <div class="login_info">
            <div class="subText">使用者帳號：</div>
            <el-input v-model="account" placeholder="請輸入電子信箱" clearable></el-input>
        </div>
        <div class="login_info">
            <div class="subText">使用者密碼：</div>
            <el-input v-model="password" placeholder="請輸入密碼" show-password clearable></el-input>
            <div class="forget">忘記密碼？</div>
        </div>
        <div class="login_info">
            <el-button type="primary" :loading="isLoading" class="login_btn">進行驗證</el-button>
        </div>
        <div class="version">Created By Joanna @v1.0.0</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return {
            isLoading:false,
            account:'',
            password:'',
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
        height: 495px;
        border-radius: 5px;
        box-shadow: 3px 4px 6px gray;
    }
    .login_title{
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
        line-height: 100px;
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
        margin-top: 80px;
        color: rgba(210,210,210);
        text-align: center;
    }
</style>