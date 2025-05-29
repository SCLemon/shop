<template>
  <div class="main">
    <div class="step">
        <el-steps :active="step" simple>
            <el-step title="未結帳" class="step_item" icon="el-icon-edit" @click.native="goToStep('/trade/cart',1)"></el-step>
            <el-step title="交易中" class="step_item" icon="el-icon-loading" @click.native="goToStep('/trade/transaction',2)"></el-step>
            <el-step title="已付款" class="step_item" icon="el-icon-check" @click.native="goToStep('/trade/finish',3)"></el-step>
        </el-steps>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:'Trade',
    data(){
        return {
            step:1,
        }
    },
    methods:{
        goToStep(path,step){
            this.$router.push(path).catch((e)=>{})
            this.step = step;
        }
    }
}
</script>

<style scoped>
    .main{
        width: 100vw;
        height: calc(100vh - 140px);
    }
    .step{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .step_item:hover{
        cursor: pointer;
    }
    @media (max-width: 760px) {
        ::v-deep .el-step__title{
            font-size: 12px !important;
        }
    }
</style>