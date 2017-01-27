/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (modFac) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = modFac(); } else { Number.makeIdCounter = modFac(); }
})(function () {
  'use strict';

  var mkIdc = function makeIdCounter(start) {
    var nxt = 0, add = 0;

    function nextId() {
      if (!add) { return (nextId.outOfInts || mkIdc.outOfInts)(nextId); }
      var id = nxt;
      nxt += add;
      if (nxt === id) {
        if (add === 1) {
          add = nxt = -1;
        } else {
          add = 0;
        }
      }
      return id;
    }

    nextId.peek = function () { return nxt; };
    nextId.reset = function (x) {
      nxt = (+x || 0);
      add = (nxt < 0 ? -1 : 1);
      return nxt;
    };
    nextId.reset(start);

    return nextId;
  };

  mkIdc.outOfInts = function () {
    throw new RangeError('nextId(): reached both ends of integer range');
  };

  return mkIdc;
});
