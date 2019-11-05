'use strict';

var Promise = require('promise');
var pg = require('pg');

const initialize = connectionString => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject();
      }

      const CREATE_QUERY = 'CREATE TABLE IF NOT EXISTS members(id text PRIMARY KEY, created_at timestamp)';
      var query = client.query(CREATE_QUERY);
      query.on('end', () => {
        done();
        return resolve();
      });
    });
  });
};

const putItem = connectionString => id => {

  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject();
      }

      var query = client.query('INSERT INTO members VALUES($1, now())', [ id ]);

      query.on('end', () => {
        done();
        return resolve();
      });
    });
  });
}

const getItem = connectionString => id => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject();
      }

      var results = [];
      var query = client.query('SELECT * FROM members WHERE id=($1)', [id]);

      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        done();
        return resolve(results.length > 0 ? results[0] : null);
      });
    });
  });
}

export default function (connectionString) {

  return initialize(connectionString).then(() => {
    return {
      put: putItem(connectionString),
      get: getItem(connectionString)
    }
  });

}
