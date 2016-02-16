/* globals blanket, module */

var options = {
  modulePrefix: 'ember-x-editable-addon',
  filter: '//.*ember-x-editable-addon/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    autostart: true,
    lcovOptions: {
      outputFile: 'lcov.dat',
      renamer: function (moduleName) {
        var expression = /^ember-x-editable-addon/;
        return moduleName.replace(expression, 'addon') + '.js';
      }
    }
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
