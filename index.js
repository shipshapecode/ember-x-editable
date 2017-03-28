/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-x-editable',

  options: {
    nodeAssets: {
      webfontloader: {
        vendor: ['webfontloader.js']
      }
    }
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      this.import('vendor/webfontloader/webfontloader.js');

      this.import('vendor/calculate-size/calculate-size.js');
    }
  }
};
