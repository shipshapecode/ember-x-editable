/* jshint node: true */
'use strict';

'use strict';

var path = require('path');

module.exports = {
  name: 'ember-x-editable-addon',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app) {
    this._super.included(app);

    this.app.import('vendor/ember-x-editable-addon.css');

    this.app.import(app.bowerDirectory + '/bower-webfontloader/webfont.js');

    this.app.import('vendor/calculate-size/calculate-size.js');
  }
};
