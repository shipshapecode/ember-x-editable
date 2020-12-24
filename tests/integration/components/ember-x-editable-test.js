import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  fillIn,
  find,
  focus,
  render,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember x editable', function (hooks) {
  setupRenderingTest(hooks);

  test('mouseEnter/mouseLeave', async function (assert) {
    this.set('mouseInsideComponent', false);
    await render(
      hbs`<XEditableText @mouseInsideComponent={{this.mouseInsideComponent}} @validator={{this.validator}} @value={{this.value}}/>`
    );
    await triggerEvent(find('.x-base'), 'mouseenter');
    assert.equal(this.get('mouseInsideComponent'), true);
    await triggerEvent(find('.x-base'), 'mouseleave');
    assert.equal(this.get('mouseInsideComponent'), false);
  });

  test('Empty value', async function (assert) {
    this.set('value', 'Empty');
    await render(
      hbs`<XEditableText @validator={{this.validator}} @value={{this.value}}/>`
    );
    await focus(find('.x-base div input'));
    assert.equal(this.get('value'), '');
  });

  test('No validator passed', async function (assert) {
    this.set('value', 'foo');
    await render(hbs`<XEditableText @value={{this.value}}/>`);
    await fillIn(find('.x-base div input'), '');
    await click('.editable-submit');
    assert.equal(this.get('value'), 'Empty');
  });
});
