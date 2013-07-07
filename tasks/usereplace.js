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
    // grunt.log.subhead('usereplace:').writeln(inspect(this));

    var options = this.options();
    var dest = options.dest;
    // grunt.log.subhead('options:').writeln(inspect(options));

    var filepaths = grunt.file.expand({filter: 'isFile'}, this.data);
    // grunt.log.subhead('filepaths:').writeln(inspect(filepaths));

    // begin build pattern: will match
    //  * <!-- build:[target] output -->
    // The following matching param are set when there's match
    //   * 0 : the whole matched expression
    //   * 1 : the target (ie. type)
    //   * 2 : the output
    var regStartBuild = /<!--\s*build:(\w+)\s*(.*)(?=\s-->)\s*-->/;
    // end build pattern -- <!-- endbuild -->
    var regEndBuild = /<!--\s*endbuild\s*-->/;

    var files = filepaths.map(function(filepath) {
      return {
        path: filepath,
        body: grunt.file.read(filepath)
      };
    });

    var sourceLines;
    var outputLines;

    var indent;
    var startBuild;
    var isReplace;
    var endBuild;
    var isBuild = false;

    files = files.map(function(file) {
      sourceLines = file.body.replace(/\r\n/g, '\n').split(/\n/);
      outputLines = [];

      sourceLines.forEach(function(line, index, array) {
        indent = (line.match(/^\s*/) || [])[0];
        startBuild = line.match(regStartBuild);
        isReplace = startBuild && startBuild[1] === 'replace';
        endBuild = isBuild && regEndBuild.test(line);

        if (isReplace) {
          isBuild = true;
          outputLines.push(indent + startBuild[2]);
        }

        if ( ! isBuild) {
          outputLines.push(line);
        }
        
        if (endBuild) {
          isBuild = false;
        }
      });

      return {
        path: path.join((dest || path.dirname(file.path)), path.basename(file.path)),
        body: outputLines.join('\n')
      };
    });

    files.forEach(function(file) {
      // grunt.log.subhead('file:').writeln(inspect(file));
      grunt.file.write(file.path, file.body);
    });
  });

};
