let MongoClient = require('mongodb').MongoClient;
let settings = require("../settings.js")
//连接数据库
const _connectDB = (callback)=> {
  let url = settings.dburl;
  MongoClient.connect(url,(err,db)=>{
    if(err) {
      callback(err,null);
      return
    }
    callback(err,db)
  })
}
//插入数据
exports.insertOne = (collectionName,json,callback)=>{
  _connectDB((err,db)=>{
    db.collection(collectionName).insertOne(json,(err,result)=>{
      callback(err,result);
      db.close()
    })
  })
}
//查找数据
exports.find = (collectionName,json,C)=>{
  let result = []
  let callback,skipnumber,limit,sort;
  if(arguments.length) {
    callback = C;
    skipnumber = 0;
    limit = 0
  } 
  _connectDB((err,db)=>{
    let  cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
    cursor.each((err,doc)=>{
      if(err) {
        callback(err,null);
        db.close()
        return
      }
      if(doc!=null) {
        result.push(doc);
      } else {
        callback(null,result);
        db.close()
      }
    })
  })
}

//删除
exports.deleteMany = (collectionName,json,callback)=> {
  _connectDB((err,db)=>{
    db.collection(collectionName).deleteMany(
      json,
      (err,result)=> {
        callback(err,result)
        db.close()
      }
    )
  })
}
//修改
exports.updateMany = (collectionName,json1,json2,callback) =>{
  _connectDB((err,db)=>{
    db.collection(collectionName).updateMany(
      json1,
      json2,
      (err,result)=>{
        callback(err,result);
        db.close()
      }
    )
  })
}
//计数
exports.getAllCount = (collectionName,callback)=>{
  _connectDB((err,db)=>{
    db.collection(collectionName).count({}).then(function(count) {
      callback(count);
      db.close();
  });
  })
}