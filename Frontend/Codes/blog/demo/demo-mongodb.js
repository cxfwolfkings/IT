/**
 * mongo驱动示例
 */
var mongo = require('mongodb');
var assert = require('assert');
var MongoClient = mongo.MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017';
// Database Name
var dbName = 'test';
// Use connect method to connect to the server
MongoClient.connect(url, {
  useNewUrlParser: true
}, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var db = client.db(dbName);
  client.close();
});

/*
db.open(function (error, dbConnection) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('db state: ', db._state);
  dbConnection.collection('messages').findOne({}, function(error, item){
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info('findOne: ', item);
    item.text = 'hi';
    var id = item._id.toString(); // we can store ID in a string
    console.info('before saving: ', item);
    dbConnection.collection('messages').save(item, function(error, item){
      console.info('save: ', item);
      dbConnection.collection('messages').find({_id: new mongo.ObjectID(id)}).toArray(function(error, items){
        console.info('find: ', items);
        db.close();
        process.exit(0);
      });
    });
  });

  console.log('db state: ', db._state);
  item = {
    name: 'Azat'
  };
  dbConnection.collection('messages').insert(item, function(error, item){
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info("created/inserted: ", item);
    db.close();
    process.exit(0);
  });
});
*/
