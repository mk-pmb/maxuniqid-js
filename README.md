
<!--#echo json="package.json" key="name" underline="=" -->
maxuniqid
=========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Make counter functions that deliver, one-by-one, all available integers: 0, 1,
…, MAX_INT, -1, -2, …, MIN_INT, then throw a RangeError. AMD/UMD package.
<!--/#echo -->


Usage
-----

From [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="47" -->
```javascript
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
```
<!--/include-->



<!--#toc stop="scan" -->





License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
