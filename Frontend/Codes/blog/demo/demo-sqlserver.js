/**
 * SQL Server驱动示例
 */
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'Admin123456', // update me
  server: '172.16.98.164',
  options: {
      database: 'SiemensISP',
      encrypt: true // 是否加密连接字符串
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});
