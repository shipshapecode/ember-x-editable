import { get, set } from '@ember/object';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import XBaseComponent from '../x-base/component';
import layout from './template';

export default XBaseComponent.extend({
  layout,

  /**
   * This is a computed property for adding/removing the is-empty class
   * @private
   */
  isEmpty: computed('isEditing', function() {
    if (!get(this, 'isEditing')) {
      if (!get(this, 'value') || get(this, 'value') === '' || get(this, 'value') === 'Empty') {
        return true;
      }
    }
    return false;
  }),

  changeUnderlineSize: observer('isEditing', function() {
    run.later(() => {
      if (!get(this, 'isEditing')) {
        if (get(this, 'value') && get(this, 'value').length > 0) {
          const size = this.getTextWidth(this.$('input'), get(this, 'value'));
          this.$('.textContainer').width('68%');
          this.$('input').width(size.width + 10);
          this.$('.borderBottom').width(size.width);
        }
      }
    });
  }),

  makeFullWidthWhenEditing: observer('isEditing', function() {
    this.$('input').width('100%');
  }),

  actions: {
    saveAction() {
      if (!get(this, 'validator')) {
        this.handleEmptyValue();
      }
      this._super(...arguments);
    }
  },

  /**
   * Set the value to the string 'Empty' when value is null, undefined, or ''.
   * @private
   */
  handleEmptyValue() {
    if (!get(this, 'value') || get(this, 'value') === '') {
      set(this, 'value', 'Empty');
    }
  }
});
