let express = require('express')
let app = express();
let MongoClient = require('mongodb').MongoClient;
let db = require("./model/db.js");
//登录
app.post("/session",router.doLogin);
//添加账单
app.post("/insertItem",router.insertItem);
//按分类查找账单
app.get('/findByType'.router.findByType)
//按时间查找账单
app.get('/findByTime',router.findByTime)
//查找数据
app.get("/find",(req,res)=>{
  db.find('teacher',{},(err,result)=>{
    res.send(result)
  })
})
app.listen(2000)