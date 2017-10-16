import $ from 'jquery';
import { skip, test } from 'qunit';
import { blur, click, fillIn, find, visit } from 'ember-native-dom-helpers';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ember-x-editable');

test('text is initially TestString', async function(assert) {
  assert.expect(2);

  await visit('/');

  assert.equal(find('.ember-x-editable-text').classList.contains('is-not-editing'), true, 'is-not-editing class initially');
  assert.equal(find('.ember-x-editable-text').value, 'TestString', 'text is initially TestString');
});

test('is-editing class applied', async function(assert) {
  assert.expect(1);

  await visit('/');
  await click('.ember-x-editable-text');

  assert.equal(find('.ember-x-editable-text').classList.contains('is-editing'), true, 'is-editing class after clicking');
});

skip('text is saved', async function(assert) {
  assert.expect(1);

  await visit('/');
  await click('.ember-x-editable-text');
  await fillIn('.ember-x-editable-text', 'New test string');
  await click('.editable-buttons .editable-submit');

  assert.equal(find('.ember-x-editable-text').value, 'New test string', 'text is saved');
});

test('text is cancelled, cancel button', async function(assert) {
  assert.expect(1);

  await visit('/');
  await click('.ember-x-editable-text');
  await fillIn('.ember-x-editable-text', 'Cancelled text');
  await click('.editable-buttons .editable-cancel');

  assert.equal(find('.ember-x-editable-text').value, 'TestString', 'text cancelled');
});

test('text is cancelled, focusOut', async function(assert) {
  assert.expect(1);

  await visit('/');
  await click('.ember-x-editable-text');
  await fillIn('.ember-x-editable-text', 'Cancelled text');
  await blur('.ember-x-editable-text');

  assert.equal(find('.ember-x-editable-text').value, 'TestString', 'text cancelled');
});

test('x-select save change', async function(assert) {
  assert.expect(1);

  await visit('/');
  await click('.ember-x-editable-select');
  $('.ember-x-editable-select option:nth-child(3)').prop('selected', true).trigger('change');
  andThen(function() {
    $('.editable-buttons .editable-save').click();
  });
  andThen(function() {
    const select = find('.ember-x-editable-select');
    assert.equal(select.options[select.selectedIndex].text, 'ReallyReallyLongTestString', 'selection saved');
  });
});

test('x-select cancel change', async function(assert) {
  assert.expect(1);

  await visit('/');

  await click('.ember-x-editable-select');
  $('.ember-x-editable-select option:nth-child(1)').prop('selected', true).trigger('change');
  andThen(function() {
    $('.editable-buttons .editable-cancel').click();
  });
  andThen(function() {
    const select = find('.ember-x-editable-select');
    assert.equal(select.options[select.selectedIndex].text, 'LongerTestString', 'selection cancelled');
  });
});
