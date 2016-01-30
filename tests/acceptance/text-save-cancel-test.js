import $ from 'jquery';
import {test} from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Text Save/Cancel');

test("changing text and clicking save/cancel correctly updates value", function (assert) {
  assert.expect(5);

  visit('/');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, "is-not-editing class initially");
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text is initially TestString");
  });
  click('.ember-x-editable-text');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-editing'), true, "is-editing class after clicking");
  });
  fillIn('.ember-x-editable-text', 'New test string');
  andThen(function () {
    $('.editable-buttons .editable-submit').click();
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'New test string', "text is saved");
  });
  click('.ember-x-editable-text');
  fillIn('.ember-x-editable-text', 'Cancelled text');
  andThen(function () {
    $('.editable-buttons .editable-cancel').click();
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'New test string', "text cancelled");
  });
});
