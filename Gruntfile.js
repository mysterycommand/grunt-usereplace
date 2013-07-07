/*
 * grunt-replace
 * https://github.com/mysterycommand/grunt-replace
 *
 * Copyright (c) 2013 Matt Hayes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    // replace: {
    //   default_options: {
    //     options: {
    //     },
    //     files: {
    //       'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
    //     },
    //   },
    //   custom_options: {
    //     options: {
    //       separator: ': ',
    //       punctuation: ' !!!',
    //     },
    //     files: {
    //       'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
    //     },
    //   },
    // },
    usereplace: {
      options: {
        dest: 'tmp'
      },
      html: [
        'test/fixtures/index.html',
        'test/fixtures/index2.html',
        'test/fixtures/index3.html'
      ]
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'usereplace', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
