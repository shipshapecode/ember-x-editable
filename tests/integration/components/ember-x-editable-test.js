import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, find, focus, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember x editable', function(hooks) {
  setupRenderingTest(hooks);

  test('mouseEnter/mouseLeave', async function(assert) {
    this.set('mouseInsideComponent', false);
    await render(hbs`{{x-editable-text mouseInsideComponent=mouseInsideComponent validator=validator value=value}}`);
    await triggerEvent(find('.x-base'), 'mouseover');
    assert.equal(this.get('mouseInsideComponent'), true);
    await triggerEvent(find('.x-base'), 'mouseout');
    assert.equal(this.get('mouseInsideComponent'), false);
  });

  test('Empty value', async function(assert) {
    this.set('value', 'Empty');
    await render(hbs`{{x-editable-text validator=validator value=value}}`);
    await focus(find('.x-base div input'));
    assert.equal(this.get('value'), '');
  });

  test('No validator passed', async function(assert) {
    this.set('value', 'foo');
    await render(hbs`{{x-editable-text value=value}}`);
    await fillIn(find('.x-base div input'), '');
    await click('.editable-submit');
    assert.equal(this.get('value'), 'Empty');
  });
});
