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
      }
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
</style>