/**
 * mysql驱动示例
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '172.16.97.127',
  user     : 'root',
  password : 'root',
  database : 'ecommerce'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
