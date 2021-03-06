// node操作sqlserver数据库
// 1 安装mssql模块 npm install mssql
// 
// 2  封装连接数据库代码
var mssql = require('mssql');
var db = {};
var config = {
 user: 'sa',
 password: '123',
 server: 'localhost',
 database: 'qq',
 port:1433,
 options: {
  encrypt: true // Use this if you're on Windows Azure
 },
 pool: {
  min: 0,
  max: 10,
  idleTimeoutMillis: 3000
 }
};
//执行sql,返回数据.
db.sql = function (sql, callBack) {
 var connection = new mssql.connection(config, function (err) {
  if (err) {
   console.log(err);
   return;
  }
  var ps = new mssql.PreparedStatement(connection);
  ps.prepare(sql, function (err) {
   if (err){
    console.log(err);
    return;
   }
   ps.execute('', function (err, result) {
    if (err){
     console.log(err);
     return;
    }
    ps.unprepare(function (err) {
     if (err){
      console.log(err);
      callback(err,null);
      return;
     }
      callBack(err, result);
    });
   });
  });
 });
};
module.exports = db;