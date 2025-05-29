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
  
      // 2. 檢查商品是否已在購物車內
      const [itemRows] = await db.execute(
        'SELECT id, quantity FROM cart_item WHERE token = ? AND product_uuid = ?',
        [token, product_uuid]
      );
  
      if (itemRows.length > 0) {
        // 商品已存在，更新數量
        const newQty = itemRows[0].quantity + qty;
        await db.execute('UPDATE cart_item SET quantity = ? WHERE id = ?', [newQty, itemRows[0].id]);
      } else {
        // 商品不存在，新增
        await db.execute(
          'INSERT INTO cart_item (token, product_uuid, quantity) VALUES (?, ?, ?)',
          [token, product_uuid, qty]
        );
      }
  
      res.send({ type: 'success', msg: '商品已添加至購物車' });
    } catch (error) {
      console.error(error);
      res.send({ type: 'error', msg: '系統異常錯誤，請洽客服人員。' });
    }
});

module.exports = router;