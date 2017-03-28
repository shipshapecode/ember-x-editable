import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  classNameBindings: ['editable-container', 'editable-inline'],
  isSelect: computed('type', function() {
    return this.get('type') === 'select';
  }),
  isText: computed('type', function() {
    return this.get('type') === 'text';
  })
});
