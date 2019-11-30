'use strict';

import pg from 'pg';
import Promise from 'promise';
import dbWrapper from '../src/db-postgres';
import {
  dropTable,
  createTable,
  insertData,
  checkTableExists
} from './helpers/db-postgres-helper';

const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'postgres:5432';
const DB_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/postgres`;

describe('testing initialization', () => {
  beforeEach((done) => {
    dropTable().then(done);
  });

  it('should have getItem and putItem methods', (done) => {
    dbWrapper(DB_URL).then((db) => {
      expect(typeof db.get).toEqual('function');
      expect(typeof db.put).toEqual('function');
      done();
    });
  });

  it('should create member table if it does not exist', (done) => {
    dbWrapper(DB_URL).then((db) => {
      checkTableExists().then((res) => {
        expect(res).toBe(true);
        done();
      });
    });
  });
});

describe('testing get method', () => {
  const sampleIds = ['12', '57', '26', '231'];
  beforeEach((done) => {
    const insertSampleData = insertData(sampleIds);
    dropTable().then(createTable).then(insertSampleData).then(done);
  });

  it('should get item', (done) => {
    dbWrapper(DB_URL).then((db) => {
      db.get('12').then((row) => {
        expect(row.id).toEqual('12');
        done();
      });
    });
  });

  it('should return null if item does not exist', (done) => {
    dbWrapper(DB_URL).then((db) => {
      db.get('not-exists').then((row) => {
        expect(row).toBe(null);
        done();
      });
    });
  });
});
