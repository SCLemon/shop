<template>
  <div class="main">
    <div class="step">
        <el-steps :active="step" simple>
            <el-step title="購物車" class="step_item" icon="el-icon-shopping-cart-1" @click.native="goToStep('/trade/cart')"></el-step>
            <el-step title="交易中" class="step_item" icon="el-icon-loading" @click.native="goToStep('/trade/transaction')"></el-step>
            <el-step title="已完成" class="step_item" icon="el-icon-check" @click.native="goToStep('/trade/finish')"></el-step>
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
            
        }
    },
    computed:{
        step(){
            const path = this.$route.path
            if(path.includes('cart')) return 1
            else if(path.includes('transaction')) return 2
            else if(path.includes('finish')) return 3
        }
    },
    methods:{
        goToStep(path){
            this.$router.push(path).catch((e)=>{})
        }
    }
}
</script>

<style scoped>
    .main{
        width: 100vw;
        height: calc(100vh - 150px);
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