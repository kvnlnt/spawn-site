var assert = require('assert');

describe('App', function() {
  describe('Namespacing', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});