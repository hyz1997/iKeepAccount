let db = require("../model/db.js");
let formidable = require("formidable");
let ObjectID = require('mongodb').ObjectID;

exports.doLogin = (req,res)=>{
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) =>{
      let code = fields.code;
      let name = fields.name;
      let avatar = fields.avatarUrl;
      db.insertOne("users",{
        "userName":name,
        "avatar":avatar,
        "code":code
      })
      db.find("users",{"userName":name},function(err,result){
          if(err) {
              res.send("-3");
              return;
          }
          res.send(result)
      });
  });
}
exports.insertItem = function(req,res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
      db.insertOne("bill",{
          "amount":fields.amount,
          "balanceType":fields.balanceType,
          "tid":files.tid,
          "note":files.note,
          "time":fields.time,
          "circleTime":fields.circleTime,
          "circleType":fields.circleType
      },(err,result)=>{
          if(err) {
              console.log("数据库出错");
              return;
          }
          res.send("errcode:1");

      })
  });
};
exports.updataItem = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        db.updateMany('bill',{"time":fields.time},{
            $set:{
                "amount":fields.amount,
                "balanceType":fields.balanceType,
                "tid":files.tid,
                "note":files.note,
                "time":fields.time,
                "circleTime":fields.circleTime,
                "circleType":fields.circleType
            }
        },(err,result)=>{
            if(err) {
                console.err(err)
                return
            }
            res.send(1);
        }

        )
    })
}
exports.deleteItem = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse=(req,(err,fields)=>{
        db.deleteMany('bill',{
            "time":fields.time
        },(err,result)=>{
            if(err) {
                return
            }
            res.json(1);
        })

    })
}
exports.findByType = (req,res)=> {
    let type = req.query.type;
    db.find('bill',{'balanceType':type},(err,result)=>{
        db.getAllCount('bill',(count)=>{
            res.json({
                status:1,
                result,
            })
        })
    })
}
exports.findByTime = (req,res)=> {
    let start = req.query.start;
    let end = req.query.end;
    db.find('bill',{'time':{'$gte':start,'$lt':end}},(err,result)=>{
        db.getAllCount('bill',(count)=>{
            res.json({
                status:1,
                result,
            })
        })
    })
}