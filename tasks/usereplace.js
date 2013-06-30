/*
 * grunt-usereplace
 * https://github.com/mysterycommand/grunt-usereplace
 *
 * Copyright (c) 2013 Matt Hayes
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var util = require('util');

function inspect(obj) {
  return util.inspect(obj, false, 4, true);
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('usereplace', 'Your task description goes here.', function() {
    grunt.log.subhead('usereplace:').writeln(inspect(this));

    var options = this.options();
    grunt.log.subhead('options:').writeln(inspect(options));
    var files = grunt.file.expand({filter: 'isFile'}, this.data);
    grunt.log.subhead('files:').writeln(inspect(files));
    var dest = options.dest;

    // begin build pattern: will match
    //  * <!-- build:[target] output -->
    // The following matching param are set when there's match
    //   * 0 : the whole matched expression
    //   * 1 : the target (ie. type)
    //   * 2 : the output
    var regBuild = /<!--\s*build:(\w+)\s*(.*)(?=\s-->)\s*-->/;
    // end build pattern -- <!-- endbuild -->
    var regEndBuild = /<!--\s*endbuild\s*-->/;

    var lines;
    var line;

    var indent;
    var build;
    var endBuild;

    var isBlock;
    var blocks;
    var block;

    files = files.map(function (filepath) {
      return {
        path: filepath,
        body: grunt.file.read(filepath)
      };
    });
    
    files = files.map(function(file) {
      // grunt.log.subhead('file:').writeln(inspect(file));
      lines = file.body.replace(/\r\n/g, '\n').split(/\n/);
      isBlock = false;
      blocks = [];

      for (var i = 0; i < lines.length; ++i) {
        line = lines[i];
        indent = (line.match(/^\s*/) || [])[0];
        build = line.match(regBuild);
        endBuild = regEndBuild.test(line);
        // grunt.log.subhead('line:')
        //   .writeln(inspect(line))
        //   .writeln(build)
        //   .writeln(endBuild)
        //   .writeln(isBlock);

        if (build) {
          isBlock = true;
          block = {};
          block.index = i;
          block.replaceWith = indent + build[2];
        }

        if (isBlock && endBuild) {
          isBlock = false;
          block.howMany = i - block.index + 1;
          blocks.push(block);
        }
      }

      for (var j = 0; j < blocks.length; ++j) {
        lines.splice(block.index, block.howMany, block.replaceWith);
      }

      return {
        path: path.join((dest || path.dirname(files[0])), path.basename(file.path)),
        body: lines.join('\n')
      };
    });

    files.forEach(function(file) {
      // grunt.log.subhead('file:').writeln(inspect(file));
      grunt.file.write(file.path, file.body);
    });
  });

};
