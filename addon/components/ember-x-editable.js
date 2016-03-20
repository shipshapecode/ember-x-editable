import Ember from 'ember';
const {Component, computed} = Ember;

export default Component.extend({
  classNameBindings: ['editable-container', 'editable-inline'],
  isSelect: computed('type', function () {
    return this.get('type') === 'select';
  }),
  isText: computed('type', function () {
    return this.get('type') === 'text';
  })
});
