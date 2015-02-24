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
    this.app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
    this.app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css.map', {
      destDir: 'assets'
    });
    this.app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
      destDir: 'fonts'
    });
    this.app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
      destDir: 'fonts'
    });
    this.app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
      destDir: 'fonts'
    });
    this.app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
      destDir: 'fonts'
    });
    this.app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
      destDir: 'fonts'
    });

    this.app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');

    this.app.import(app.bowerDirectory + '/bower-webfontloader/webfont.js');

    this.app.import('vendor/calculate-size/calculate-size.js');
  }
};
