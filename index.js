/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-x-editable',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.importDependencies(app);
  },

  importDependencies: function(app) {
    if (arguments.length < 1) {
      throw new Error('Application instance must be passed to import');
    }

    var vendor = this.treePaths.vendor;

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/bower-webfontloader/webfont.js');

      app.import(vendor + '/calculate-size/calculate-size.js');
    }
  }
};
