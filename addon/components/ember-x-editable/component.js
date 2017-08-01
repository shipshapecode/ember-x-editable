import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: ['editable-container', 'editable-inline']
});
