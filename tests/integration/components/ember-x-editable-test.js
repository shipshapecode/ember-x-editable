import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-x-editable', 'Integration | Component | ember x editable', {
  integration: true
});

test('mouseEnter/mouseLeave', function (assert) {
  this.set('mouseInsideComponent', false);
  this.render(hbs`{{x-text mouseInsideComponent=mouseInsideComponent validator=validator value=value}}`);
  this.$('div').first().mouseenter();
  assert.equal(this.get('mouseInsideComponent'), true);
  this.$('div').first().mouseleave();
  assert.equal(this.get('mouseInsideComponent'), false);
});
