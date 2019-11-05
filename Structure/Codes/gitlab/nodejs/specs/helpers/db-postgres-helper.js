'use strict';

import pg from 'pg';
import Promise from 'promise';

const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'postgres:5432';
const DB_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/postgres`;

export function dropTable() {
  return new Promise((resolve, reject) => {
    pg.connect(DB_URL, (err, client, done) => {
      if (err) {
        done();
        return reject();
      }

      var query = client.query('DROP TABLE IF EXISTS members');

      query.on('end', () => {
        done();
        return resolve();
      });
    });
  });
};

export function createTable() {
  const CREATE_QUERY = 'CREATE TABLE IF NOT EXISTS members(id text PRIMARY KEY, created_at timestamp)';
  return new Promise((resolve, reject) => {
    var client = new pg.Client(DB_URL);
    client.connect((err) => {
      if(err) {
        return reject();
      }

      client.query(CREATE_QUERY, (err, result) => {
        if (err) {
          return reject();
        }

        client.end();
        return resolve();
      });
    });
  });
};

export const insertData = data => () => {
  const INSERT_QUERY = 'INSERT INTO members VALUES($1, now())';

  return new Promise((resolve, reject) => {
    var client = new pg.Client(DB_URL);
    client.connect((err) => {
      if(err) {
        return reject();
      }

      let doneCount = 0;

      data.forEach((id) => {
        client.query(INSERT_QUERY, [id], (err, result) => {
          if (err) {
            return reject();
          }

          doneCount += 1;

          if (doneCount == data.length) {
            client.end();
            return resolve();
          }
        });
      });
    });
  });
};

export function checkTableExists() {
  const QUERY_STRING = 'SELECT relname FROM pg_class WHERE relname=\'members\'';

  return new Promise((resolve, reject) => {
    var client = new pg.Client(DB_URL);
    client.connect((err) => {
      if(err) {
        return reject();
      }

      client.query(QUERY_STRING, (err, result) => {
        if (err) {
          return reject();
        }
        client.end();
        resolve(result.rows.length === 1);
      });
    });
  });
};

export function isUp() {
  return new Promise((resolve, reject) => {
    var client = new pg.Client(DB_URL);
    client.connect((err) => {
      if(err) {
        return reject();
      }

      client.query('select version()', (err, result) => {
        if (err) {
          return reject();
        }
        client.end();
        resolve();
      });
    });
  });
};
