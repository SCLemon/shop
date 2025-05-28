const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.js');

// 註冊 (token、帳號、密碼、電子信箱、基本信息(JSON))
router.post('/api/verify/register', async (req, res) => {
    const { account, password, email } = req.body;
  
    // 資料基本驗證
    if (!account || !password || !email) {
        return res.send({
            type: 'error',
            msg: '缺少必要欄位'
        });
    }
  
    try {
        // 檢查帳號是否已存在
        const [rows] = await db.execute('SELECT * FROM User WHERE account = ?', [account]);
        if (rows.length > 0) {
            return res.send({
                type: 'error',
                msg: '帳號已存在'
            });
        }
    
        // 建立 token
        const token = uuidv4();
    
        // 插入新使用者
        await db.execute(
            'INSERT INTO User (token, account, password, email) VALUES (?, ?, ?, ?)',
            [token, account, password, email]
        );
    
        // 設定 cookie，存活 7 天
        res.cookie('x-user-token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    
        return res.send({
            type: 'success',
            msg: '註冊成功'
        });
  
    } 
    catch (error) {
        console.error('註冊失敗:', error);
        return res.send({
            type: 'error',
            msg: '註冊失敗'
        });
    }
});
  
  module.exports = router;
