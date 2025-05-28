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
        const [rows] = await db.execute('SELECT * FROM User WHERE account = ? LIMIT 1', [account]);
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
  
// 登入
router.post('/api/verify/login', async (req, res) => {
    const { account, password } = req.body;
  
    if (!account || !password) {
        return res.send({
            type: 'error',
            msg: '缺少必要欄位'
        });
    }

    try {

        const [rows] = await db.execute('SELECT * FROM User WHERE account = ?', [account]);
        if (rows.length === 0) {
            return res.send({
                type: 'error',
                msg: '帳號或密碼錯誤'
            });
        }
    
        const user = rows[0];
        if (user.password !== password) {
            return res.send({
                type: 'error',
                msg: '帳號或密碼錯誤'
            });
        }
    
        res.cookie('x-user-token', user.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
            sameSite: 'Strict',
            secure: false
        });
    
        return res.send({
            type: 'success',
            msg: '登入成功'
        });
  
    } 
    catch (error) {
        console.error('登入失敗:', error);
        return res.send({
            type: 'error',
            msg: '登入失敗'
        });
    }
});
  
// token 驗證
router.get('/api/verify/check', async (req, res) => {
    const token = req.headers['x-user-token'];
  
    if (!token) {
        return res.send({
            type: 'error',
            msg: '缺少 token'
        });
    }
  
    try {
      const [rows] = await db.execute('SELECT * FROM User WHERE token = ?', [token]);
  
      if (rows.length === 0) {
        return res.send({
          type: 'error',
          msg: '無效的 token'
        });
      }

      return res.send({
        type: 'success',
        msg: '驗證成功',
      });
  
    } 
    catch (err) {
        console.error('驗證失敗:', err);
        return res.send({
            type: 'error',
            msg: '伺服器錯誤'
        });
    }
 });
  
module.exports = router;
