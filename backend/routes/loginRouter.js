const express = require('express');
const router = express.Router();

const multer = require('multer');

const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');


// 註冊 (帳號、密碼、電子信箱、token、)
router.post('/api/login',(req, res) => {
    res.send('hello world')
});




// 文件處理
const upload = multer();
router.post('/api/upload/',upload.fields([
    { name: 'attachments', maxCount: 50 },
])
,(req, res) => {

    var attachments = req.files['attachments'];

});


module.exports = router;