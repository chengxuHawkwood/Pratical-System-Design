'use strict'
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return 0 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });
  });
});
