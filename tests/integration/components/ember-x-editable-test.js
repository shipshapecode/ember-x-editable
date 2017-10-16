import { moduleForComponent, test } from 'ember-qunit';
import { find, focus, triggerEvent } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-x-editable', 'Integration | Component | ember x editable', {
  integration: true
});

test('mouseEnter/mouseLeave', async function(assert) {
  this.set('mouseInsideComponent', false);
  this.render(hbs`{{x-editable-text mouseInsideComponent=mouseInsideComponent validator=validator value=value}}`);
  await triggerEvent(find('.x-base'), 'mouseover');
  assert.equal(this.get('mouseInsideComponent'), true);
  await triggerEvent(find('.x-base'), 'mouseout');
  assert.equal(this.get('mouseInsideComponent'), false);
});

test('Empty value', async function(assert) {
  this.set('value', 'Empty');
  this.render(hbs`{{x-editable-text validator=validator value=value}}`);
  await focus(find('.x-base div input'));
  assert.equal(this.get('value'), '');
});
