'use strict';

define('dummy/tests/acceptance/ember-x-editable-test', ['qunit', 'ember-native-dom-helpers', 'dummy/tests/helpers/module-for-acceptance'], function (_qunit, _emberNativeDomHelpers, _moduleForAcceptance) {
  'use strict';

  (0, _moduleForAcceptance.default)('Acceptance | ember-x-editable');

  (0, _qunit.test)('text is initially TestString', async function (assert) {
    assert.expect(2);

    await (0, _emberNativeDomHelpers.visit)('/');

    assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text').classList.contains('is-not-editing'), true, 'is-not-editing class initially');
    assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text').value, 'TestString', 'text is initially TestString');
  });

  (0, _qunit.test)('is-editing class applied', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');
    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-text');

    assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text').classList.contains('is-editing'), true, 'is-editing class after clicking');
  });

  (0, _qunit.test)('text is saved', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');
    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-text');
    await (0, _emberNativeDomHelpers.fillIn)('.ember-x-editable-text', 'New test string');
    Ember.$('.editable-buttons .editable-submit').click();
    andThen(function () {
      assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text', 'html').value, 'New test string', 'text is saved');
    });
  });

  (0, _qunit.test)('text is cancelled, cancel button', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');
    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-text');
    await (0, _emberNativeDomHelpers.fillIn)('.ember-x-editable-text', 'Cancelled text');
    await (0, _emberNativeDomHelpers.click)('.editable-buttons .editable-cancel');

    assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text').value, 'TestString', 'text cancelled');
  });

  (0, _qunit.test)('text is cancelled, focusOut', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');
    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-text');
    await (0, _emberNativeDomHelpers.fillIn)('.ember-x-editable-text', 'Cancelled text');
    await (0, _emberNativeDomHelpers.blur)('.ember-x-editable-text');

    assert.equal((0, _emberNativeDomHelpers.find)('.ember-x-editable-text').value, 'TestString', 'text cancelled');
  });

  (0, _qunit.test)('x-select save change', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');
    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-select');
    Ember.$('.ember-x-editable-select option:nth-child(3)').prop('selected', true).trigger('change');
    andThen(function () {
      Ember.$('.editable-buttons .editable-save').click();
    });
    andThen(function () {
      const select = (0, _emberNativeDomHelpers.find)('.ember-x-editable-select');
      assert.equal(select.options[select.selectedIndex].text, 'ReallyReallyLongTestString', 'selection saved');
    });
  });

  (0, _qunit.test)('x-select cancel change', async function (assert) {
    assert.expect(1);

    await (0, _emberNativeDomHelpers.visit)('/');

    await (0, _emberNativeDomHelpers.click)('.ember-x-editable-select');
    Ember.$('.ember-x-editable-select option:nth-child(1)').prop('selected', true).trigger('change');
    andThen(function () {
      Ember.$('.editable-buttons .editable-cancel').click();
    });
    andThen(function () {
      const select = (0, _emberNativeDomHelpers.find)('.ember-x-editable-select');
      assert.equal(select.options[select.selectedIndex].text, 'LongerTestString', 'selection cancelled');
    });
  });
});
define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('utils/validators.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/validators.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name, options = {}) {
    (0, _qunit.module)(name, {
      beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach() {
        let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(() => (0, _destroyApp.default)(this.application));
      }
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(() => {
      let application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/ember-x-editable-test', ['ember-qunit', 'ember-native-dom-helpers'], function (_emberQunit, _emberNativeDomHelpers) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('ember-x-editable', 'Integration | Component | ember x editable', {
    integration: true
  });

  (0, _emberQunit.test)('mouseEnter/mouseLeave', async function (assert) {
    this.set('mouseInsideComponent', false);
    this.render(Ember.HTMLBars.template({
      "id": "tHg8q+RI",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"x-editable-text\",null,[[\"mouseInsideComponent\",\"validator\",\"value\"],[[22,[\"mouseInsideComponent\"]],[22,[\"validator\"]],[22,[\"value\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));
    await (0, _emberNativeDomHelpers.triggerEvent)((0, _emberNativeDomHelpers.find)('.x-base'), 'mouseover');
    assert.equal(this.get('mouseInsideComponent'), true);
    await (0, _emberNativeDomHelpers.triggerEvent)((0, _emberNativeDomHelpers.find)('.x-base'), 'mouseout');
    assert.equal(this.get('mouseInsideComponent'), false);
  });

  (0, _emberQunit.test)('Empty value', async function (assert) {
    this.set('value', 'Empty');
    this.render(Ember.HTMLBars.template({
      "id": "k15JrToA",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"x-editable-text\",null,[[\"validator\",\"value\"],[[22,[\"validator\"]],[22,[\"value\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));
    await (0, _emberNativeDomHelpers.focus)((0, _emberNativeDomHelpers.find)('.x-base div input'));
    assert.equal(this.get('value'), '');
  });

  (0, _emberQunit.test)('No validator passed', async function (assert) {
    this.set('value', 'foo');
    this.render(Ember.HTMLBars.template({
      "id": "dqYqGpuE",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"x-editable-text\",null,[[\"value\"],[[22,[\"value\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));
    await (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('.x-base div input'), '');
    await (0, _emberNativeDomHelpers.click)('.editable-submit');
    assert.equal(this.get('value'), 'Empty');
  });
});
define('dummy/tests/templates.template.lint-test', [], function () {
  'use strict';

  QUnit.module('TemplateLint');

  QUnit.test('dummy/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/application.hbs should pass TemplateLint.\n\n');
  });
});
define('dummy/tests/test-helper', ['dummy/app', 'dummy/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/ember-x-editable-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/ember-x-editable-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/ember-x-editable-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ember-x-editable-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/components/x-editable-text-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/x-editable-text-test.js should pass ESLint\n\n');
  });
});
define('dummy/tests/unit/components/x-editable-text-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('component:x-editable-text', 'Unit | x editable text', {
    unit: true
  });

  (0, _emberQunit.test)('should set isValid based on errorMessage', function (assert) {
    assert.expect(2);
    const xText = this.subject();
    xText.set('errorMessage', 'Error!!');
    assert.equal(xText.get('isValid'), false);
    xText.set('errorMessage', null);
    assert.equal(xText.get('isValid'), true);
  });

  (0, _emberQunit.test)('isEmpty: not empty', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', 'Hello world');
    assert.equal(xText.get('isEmpty'), false);
  });

  (0, _emberQunit.test)('isEmpty: \'\'', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', '');
    assert.equal(xText.get('isEmpty'), true);
  });

  (0, _emberQunit.test)('isEmpty: Empty', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', 'Empty');
    assert.equal(xText.get('isEmpty'), true);
  });

  (0, _emberQunit.test)('isEmpty: null', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', null);
    assert.equal(xText.get('isEmpty'), true);
  });

  (0, _emberQunit.test)('handleEmptyValue: null', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', null);
    xText.handleEmptyValue();
    assert.equal(xText.get('value'), 'Empty');
  });

  (0, _emberQunit.test)('handleEmptyValue: \'\'', function (assert) {
    assert.expect(1);
    const xText = this.subject();
    xText.set('value', '');
    xText.handleEmptyValue();
    assert.equal(xText.get('value'), 'Empty');
  });
});
define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
