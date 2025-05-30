const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.js');



// 立即下單
router.post('/api/transaction/add', async (req, res) => {
    const token = req.headers['x-user-token'];
    const { trade_id, product_uuid } = req.body;
  
    if (!token || !trade_id || !product_uuid) {
        return res.send({ type: 'error', msg: '缺少必要參數'});
    }
  
    try {
        // 1. 查商品價格和數量
        const [productRows] = await db.execute(
            'SELECT price, remaining FROM Product WHERE uuid = ?',
            [product_uuid]
        );
        if (productRows.length === 0) {
            return res.send({ type: 'error', msg: '商品不存在'});
        }
        const price = productRows[0].price;


        // 2. 查購物車數量
        const [cartRows] = await db.execute(
            'SELECT quantity FROM Cart_Item WHERE product_uuid = ? AND token = ?',
            [product_uuid, token]
        );
        if (cartRows.length === 0) {
            return res.send({ type: 'error', msg: '購物車查無此商品。'});
        }
        const quantity = cartRows[0].quantity;
    

        // 3. 檢查下單數量是否超過剩餘數量
        const remaining =  productRows[0].remaining;
        if(quantity > remaining){
            return res.send({ type: 'error', msg: `商品剩餘數量不足（<${remaining}）。`});
        }

        // 更新商品剩餘數量
        await db.execute(
            'UPDATE Product SET remaining = remaining - ? WHERE uuid = ?',
            [quantity, product_uuid]
        );

        // 4. 計算訂單金額
        const total_amount = price * quantity;
    
        // 5. 新增訂單 (狀態未付款)
        await db.execute(
            'INSERT INTO `Order` (token, trade_id, total_amount, status) VALUES (?, ?, ?, "未付款")',
            [token, trade_id, total_amount]
        );

        // 6. 新增訂單商品項目
        await db.execute(
            `INSERT INTO Order_Item (trade_id, token, product_uuid, quantity, item_price) 
            VALUES (?, ?, ?, ?, ?)`,
            [trade_id, token, product_uuid, quantity, price]
        );
        
        // 7. 刪除購物車中該商品
        await db.execute(
            'DELETE FROM Cart_Item WHERE trade_id = ? AND token = ?',
            [trade_id, token]
        );

        res.send({ type: 'success', msg: '商品下單成功' });
    } catch (error) {
        console.error(error);
        res.send({ type: 'error', msg: '商品下單失敗' });
    }
});


// 獲取購物車信息
router.get('/api/cart/items', async (req, res) => {
    const token = req.headers['x-user-token'];
    if (!token) {
      return res.send({ type: 'error', msg: '請先登入再查看購物車。' });
    }
  
    try {
      const [rows] = await db.execute(`
        SELECT
          ci.id,
          ci.trade_id,
          ci.product_uuid,
          ci.quantity,
          p.name,
          p.price,
          p.detail,
          p.src
        FROM Cart_Item ci
        JOIN product p ON ci.product_uuid = p.uuid
        WHERE ci.token = ?
      `, [token]);
  
      res.json({
        type: 'success',
        data: rows
      });
    } catch (error) {
      console.error(error);
      res.send({ type: 'error', msg: '系統異常錯誤，請洽客服人員。' });
    }
});


// 刪除購物商品
router.delete('/api/cart/delete/:trade_id', async (req, res) => {
    const token = req.headers['x-user-token'];
    const { trade_id } = req.params;

    // 檢查欄位
    if (!token || !trade_id ) {
        return res.send({ type: 'error', msg: '商品刪除失敗' });
    }

    try {
        const [result] = await db.execute(`
            DELETE FROM Cart_Item
            WHERE token = ? AND trade_id = ?
        `, [token, trade_id]);

        if (result.affectedRows === 0) {
            return res.send({ type: 'error', msg: '找不到對應的購物車項目' });
        }

        return res.send({ type: 'success', msg: '商品刪除成功' });
    } catch (err) {
        console.error('更新失敗:', err);
        return res.send({ type: 'error', msg: '系統錯誤，無法刪除商品' });
    }
});

module.exports = router;