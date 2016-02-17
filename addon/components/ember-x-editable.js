import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['editable-container', 'editable-inline'],
  isSelect: Ember.computed('type', function () {
    return this.get('type') === 'select';
  }),
  isText: Ember.computed('type', function () {
    return this.get('type') === 'text';
  })
});
