# grunt-usereplace

> A dead simple HTML find & replace plugin. Loosely based on `grunt-usemin`.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-usereplace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-usereplace');
```

## The "usereplace" task

### Overview
In your project's Gruntfile, add a section named `usereplace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  usereplace: {
    options: {
      // The dest folder is optional. Omitting it will overwrite targetted files.
      dest: 'path/to/dest/folder'
    },
    // Targets expect a list of HTML filepaths. Each file is read, processed, and written into the dest directory (or overwritten in place).
    html: [
        'path/to/target/file1.html',
        'path/to/target/file2.html',
        'path/to/target/file3.html'
    ]
  },
})
```

### Options

#### More info coming soon?

### Usage Examples

#### More info coming soon?

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

`0.1.4` is probably quite a bit safer. Works with multiple build:replace blocks and correctly ignores `grunt-usemin` blocks. Still though, use at own risk.

`0.1.3` is just a barely functional version, use at your own risk!
