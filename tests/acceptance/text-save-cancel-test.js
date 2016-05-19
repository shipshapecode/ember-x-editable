import $ from 'jquery';
import {test} from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Text Save/Cancel');

test('text is initially TestString', function (assert) {
  assert.expect(2);
  visit('/');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, "is-not-editing class initially");
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text is initially TestString");
  });
});

test('is-editing class applied', function (assert) {
  assert.expect(1);
  visit('/');
  click('.ember-x-editable-text');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-editing'), true, "is-editing class after clicking");
  });
});


test('text is saved', function (assert) {
  assert.expect(1);
  visit('/');
  andThen(function () {
    click('.ember-x-editable-text');
    andThen(function () {
      fillIn('.ember-x-editable-text', 'New test string');
    });
    andThen(function () {
      $('.editable-buttons .editable-submit').click();
    });
    andThen(function () {
      assert.equal(find('.ember-x-editable-text', 'html').val(), 'New test string', "text is saved");
    });
  });
});

test("text is cancelled", function (assert) {
  assert.expect(1);
  visit('/');
  andThen(function () {

    click('.ember-x-editable-text');
    andThen(function () {
      fillIn('.ember-x-editable-text', 'Cancelled text');
    });
    andThen(function () {
      $('.editable-buttons .editable-cancel').click();
    });
    andThen(function () {
      assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text cancelled");
    });
  });
});
