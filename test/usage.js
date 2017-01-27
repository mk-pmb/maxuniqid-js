/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('assert').deepStrictEqual, r = {};

function readmeDemo(equal) {
  equal = eq;
  //#u
  var ids, makeIdCounter = require('maxuniqid'), nextId = makeIdCounter(),
    MAX_ID = Number.MAX_SAFE_INTEGER + 1,
    MIN_ID = Number.MIN_SAFE_INTEGER - 1;

  ids = [ nextId(), nextId(), nextId() ];
  equal(ids, [ 0, 1, 2 ]);

  nextId.reset(0);
  ids = [ nextId(), nextId(), nextId() ];
  equal(ids, [ 0, 1, 2 ]);

  nextId.reset(42);
  ids = [ nextId(), nextId(), nextId() ];
  equal(ids, [ 42, 43, 44 ]);

  nextId.reset(-23);
  ids = [ nextId(), nextId(), nextId() ];
  equal(ids, [ -23, -24, -25 ]);

  // Make sure our MAX_ID really touches the limit:
  equal(MAX_ID, MAX_ID + 1);

  nextId.reset(Number.MAX_SAFE_INTEGER - 1);
  ids = [ nextId(), nextId(), nextId(), nextId(), nextId() ];
  equal(ids, [ 9007199254740990,
               9007199254740991,
               9007199254740992,
               -1, -2 ]);

  // Make sure our MIN_ID really touches the limit:
  equal(MIN_ID, MIN_ID - 1);

  nextId.reset(Number.MIN_SAFE_INTEGER + 1);
  ids = [ nextId(), nextId(), nextId() ];
  equal(ids, [ -9007199254740990,
               -9007199254740991,
               -9007199254740992 ]);

  try {
    ids = 'still alive';
    nextId();
  } catch (err) {
    ids = String(err).substr(0, 12);
  }
  equal(ids, 'RangeError: ');
  //#r











  return { mk: makeIdCounter, nx: nextId };
}



r.a = readmeDemo();
r.b = readmeDemo();

eq(r.a.mk, r.b.mk);
eq(r.a.nx === r.b.nx, false);
