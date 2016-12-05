'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addBowerPackagesToProject([
        {
          name: 'bootstrap',
          target: '~3.3'
        },
        {
          name: 'bower-webfontloader',
          target: '~1.5.13'
        }
      ]);
  }
};
