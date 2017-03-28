import $ from 'jquery';
import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ember-x-editable');

test('text is initially TestString', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, 'is-not-editing class initially');
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', 'text is initially TestString');
  });
});

test('is-editing class applied', function(assert) {
  assert.expect(1);
  visit('/');
  click('.ember-x-editable-text');
  andThen(function() {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-editing'), true, 'is-editing class after clicking');
  });
});

test('text is saved', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    click('.ember-x-editable-text');
    andThen(function() {
      fillIn('.ember-x-editable-text', 'New test string');
    });
    andThen(function() {
      $('.editable-buttons .editable-submit').click();
    });
    andThen(function() {
      assert.equal(find('.ember-x-editable-text', 'html').val(), 'New test string', 'text is saved');
    });
  });
});

test('text is cancelled, cancel button', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    click('.ember-x-editable-text');
    andThen(function() {
      fillIn('.ember-x-editable-text', 'Cancelled text');
    });
    andThen(function() {
      $('.editable-buttons .editable-cancel').click();
    });
    andThen(function() {
      assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', 'text cancelled');
    });
  });
});

test('text is cancelled, focusOut', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    click('.ember-x-editable-text');
    andThen(function() {
      fillIn('.ember-x-editable-text', 'Cancelled text');
    });
    andThen(function() {
      $('.ember-x-editable-text').focusout();
    });
    andThen(function() {
      assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', 'text cancelled');
    });
  });
});

test('x-select save change', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    click('.ember-x-editable-select');
    andThen(function() {
      $('.ember-x-editable-select option:nth-child(3)').prop('selected', true).trigger('change');
    });
    andThen(function() {
      $('.editable-buttons .editable-save').click();
    });
    andThen(function() {
      assert.equal(find('.ember-x-editable-select option:selected', 'html').text(), 'ReallyReallyLongTestString', 'selection saved');
    });
  });
});

test('x-select cancel change', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function() {
    click('.ember-x-editable-select');
    andThen(function() {
      $('.ember-x-editable-select option:nth-child(1)').prop('selected', true).trigger('change');
    });
    andThen(function() {
      $('.editable-buttons .editable-cancel').click();
    });
    andThen(function() {
      assert.equal(find('.ember-x-editable-select option:selected', 'html').text(), 'LongerTestString', 'selection cancelled');
    });
  });
});
