import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: ['editable-container', 'editable-inline'],
  isSelect: computed('type', function() {
    return this.get('type') === 'select';
  }),
  isText: computed('type', function() {
    return this.get('type') === 'text';
  })
});
