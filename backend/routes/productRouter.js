const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.js');


// 先檢查訪問者在 User 表中的 level 信息，level = 2 才可執行下一步
function authMiddleWare(){

}

// product 表中建立
router.post('/api/product/add',authMiddleWare,async (req, res) => {
    
});
  

  
module.exports = router;
