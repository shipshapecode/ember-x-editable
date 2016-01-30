import {test} from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Clicking applies classes');

test("clicking applies classes", function (assert) {
  assert.expect(2);
  visit('/');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, "is-not-editing class initially");
  });
  click('.ember-x-editable-text');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-editing'), true, "is-editing class applied when clicked");
  });
});
