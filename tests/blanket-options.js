/* globals blanket, module */

var options = {
  modulePrefix: 'ember-x-editable-addon',
  filter: '//.*ember-x-editable-addon/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['json'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
