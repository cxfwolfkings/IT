'use strict';

import { waterfall, parallel} from '../src/async';

describe('testing parallel', () => {
  it ('should return a Promise object', () => {
    const p = parallel([], function(){});
    expect(typeof p.then).toEqual('function');
  });

  it ('should return correct output', (done) => {
    const arr = [1];
    const fn = function (i, cb) { cb(null, i * 6) };

    parallel(arr, fn).then((res) => {
      expect(res).toEqual([6]);
      done();
    });
  });

  it('should call the function with each element in the array', (done) => {
    var arr = [1, 2, 3, 4, 5];
    let fnObj = {
      fn: function (i, cb) { cb(null, i * 6) }
    };
    spyOn(fnObj, 'fn').and.callThrough();

    parallel(arr, fnObj.fn).then((res) => {
      expect(fnObj.fn.calls.count()).toEqual(arr.length);
      expect(fnObj.fn.calls.allArgs().map(args => args[0])).toEqual(arr);
      done();
    });
  });
});

describe('testing waterfall', () => {
  it('should return a Promise object', () => {
    let p = waterfall([function(){}]);
    expect(typeof p.then).toEqual('function');
  });

  it('should throw error if all items in function array are not functions', (done) => {
    expect(() => {
      let p = waterfall([function(){}, 3])
    }).toThrow();
    done();
  });

  it('should  throw error no arguments given', () => {
    expect(() => {
      let p = waterfall()
    }).toThrow();
  });
});
