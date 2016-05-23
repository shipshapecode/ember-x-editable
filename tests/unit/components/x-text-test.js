import { moduleFor, test } from 'ember-qunit';

moduleFor('component:x-text', 'Unit | x text', {
  unit: true
});

test('should set isValid based on errorMessage', function(assert) {
  assert.expect(2);
  const xText = this.subject();
  xText.set('errorMessage', 'Error!!');
  assert.equal(xText.get('isValid'), false);
  xText.set('errorMessage', null);
  assert.equal(xText.get('isValid'), true);
});
