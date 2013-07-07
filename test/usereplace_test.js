'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.usereplace = {
  setUp: function(done) {
    // setup here if necessary
    // grunt.file.copy('test/fixtures/index.html', 'tmp/inline.html');
    done();
  },
  index: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/index.html');
    var expected = grunt.file.read('test/expected/index.html');
    test.equal(actual, expected, 'should create a new edited file.');

    test.done();
  },
  index2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/index2.html');
    var expected = grunt.file.read('test/expected/index2.html');
    test.equal(actual, expected, 'should work with multiple replace blocks.');

    test.done();
  },
  index3: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/index3.html');
    var expected = grunt.file.read('test/expected/index3.html');
    test.equal(actual, expected, 'should ignore other build type blocks.');

    test.done();
  }
};
