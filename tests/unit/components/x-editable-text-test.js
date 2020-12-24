import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | x editable text', function(hooks) {
  setupTest(hooks);

  test('should set isValid based on errorMessage', function(assert) {
    assert.expect(2);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('errorMessage', 'Error!!');
    assert.equal(xText.get('isValid'), false);
    xText.set('errorMessage', null);
    assert.equal(xText.get('isValid'), true);
  });

  test('isEmpty: not empty', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', 'Hello world');
    assert.equal(xText.get('isEmpty'), false);
  });

  test('isEmpty: \'\'', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', '');
    assert.equal(xText.get('isEmpty'), true);
  });

  test('isEmpty: Empty', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', 'Empty');
    assert.equal(xText.get('isEmpty'), true);
  });

  test('isEmpty: null', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', null);
    assert.equal(xText.get('isEmpty'), true);
  });

  test('handleEmptyValue: null', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', null);
    xText.handleEmptyValue();
    assert.equal(xText.get('value'), 'Empty');
  });

  test('handleEmptyValue: \'\'', function(assert) {
    assert.expect(1);
    const xText = this.owner.factoryFor('component:x-editable-text').create();
    xText.set('value', '');
    xText.handleEmptyValue();
    assert.equal(xText.get('value'), 'Empty');
  });
});
