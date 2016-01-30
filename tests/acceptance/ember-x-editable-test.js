import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('X-editable functionality tests', {
  beforeEach: function () {
    application = startApp();
  },
  afterEach: function () {
    Ember.run(application, 'destroy');
  }
});


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

test("changing text and clicking save changes value", function (assert) {
  assert.expect(3);

  visit('/');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, "is-not-editing class initially");
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text is initially TestString");
  });
  click('.ember-x-editable-text');
  fillIn('.ember-x-editable-text', 'New test string');
  click('.editable-buttons .editable-submit');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'New test string', "text is saved");
  });
});

test("changing text and clicking cancel does not change value", function (assert) {
  assert.expect(3);

  visit('/');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').hasClass('is-not-editing'), true, "is-not-editing class initially");
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text is initially TestString");
  });
  click('.ember-x-editable-text');
  fillIn('.ember-x-editable-text', 'New test string');
  click('.editable-buttons .editable-cancel');
  andThen(function () {
    assert.equal(find('.ember-x-editable-text', 'html').val(), 'TestString', "text is unchanged");
  });
});
