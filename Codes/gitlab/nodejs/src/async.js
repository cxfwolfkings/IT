'use strict';

import Promise from 'promise';

/*

*/
export function parallel(items, fn) {
  return Promise.all(items.map((item) => {
    return new Promise((resolve, reject) => {
      fn.call(null, item, (err, output) => {
        if (err) {
          reject()
        }
        else {
          resolve(output)
        }
      });
    });
  }));
}

export function waterfall(...args) {
  let fns, initial;
  if (args.length === 1) {
    initial = 0;
    fns = args[0]
  }
  else {
    initial = args[0];
    fns = args[1];
  }

  if (!Array.isArray(fns) || !fns.every((fn) => typeof fn === 'function')) {
    throw TypeError('functions should be an array of functions');
  }

  return new Promise((resolve, reject) => {
    let p = new Promise.resolve();

    fns.forEach((fn) => {
      p = p.then((res) => {
        return new Promise((success, fail) => {
          fn.call(null, res, (err, newRes) => {
            if (err) {
              fail()
            }
            else {
              success(newRes);
            }
          });
        });
      });
    });

    p.then(resolve, reject);
  });
}
