const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.js');



// 添加商品至購物車
router.post('/api/cart/add', async (req, res) => {
    const token = req.headers['x-user-token'];
    const { product_uuid, quantity } = req.body;
    if (!token || !product_uuid) {
      return res.send({ type: 'error', msg: '請先登入後再加入購物車。', redirect:'/verify'});
    }
  
    let qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) qty = 1;
  
    try {
      // 1. 確認購物車是否存在，若無則新增
      const [cartRows] = await db.execute('SELECT token FROM cart WHERE token = ?', [token]);
      if (cartRows.length === 0) {
        await db.execute('INSERT INTO cart (token) VALUES (?)', [token]);
      }

      const trade_id = uuidv4();
      await db.execute(
        'INSERT INTO cart_item (token, trade_id, product_uuid, quantity) VALUES (?, ?, ?, ?)',
        [token, trade_id, product_uuid, qty]
      );
  
      res.send({ type: 'success', msg: '商品已添加至購物車' });
    } 
    catch (error) {
      console.error(error);
      res.send({ type: 'error', msg: '系統異常錯誤，請洽客服人員。' });
    }
});

// 獲取購物車信息
router.get('/api/cart/items', async (req, res) => {
    const token = req.headers['x-user-token'];
    const status = req.query.status;
    if (!token) {
      return res.send({ type: 'error', msg: '請先登入再查看購物車。' });
    }
  
    try {
      // 取得該 token 的購物車商品資料
      // JOIN product 表以取得商品詳細資訊
      const [rows] = await db.execute(`
        SELECT
          ci.id,
          ci.trade_id,
          ci.product_uuid,
          ci.quantity,
          ci.status,
          p.name,
          p.price,
          p.detail,
          p.src
        FROM Cart_Item ci
        JOIN product p ON ci.product_uuid = p.uuid
        WHERE ci.token = ? AND ci.status = ?
      `, [token, status]);
  
      res.json({
        type: 'success',
        data: rows
      });
    } catch (error) {
      console.error(error);
      res.send({ type: 'error', msg: '系統異常錯誤，請洽客服人員。' });
    }
});
module.exports = router;