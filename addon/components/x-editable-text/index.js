import { get, set } from '@ember/object';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import XBaseComponent from '../x-base';

export default XBaseComponent.extend({
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
          const borderBottom = this.element.querySelector('.borderBottom');
          const input = this.element.querySelector('input');
          const textContainer = this.element.querySelector('.textContainer');
          const size = this.getTextWidth(input, get(this, 'value'));
          textContainer.style.width = '68%';
          input.style.width = `${size.width + 10}px`;
          borderBottom.style.width = `${size.width + 3}px`;
        }
      }
    });
  }),

  makeFullWidthWhenEditing: observer('isEditing', function() {
    this.element.querySelector('input').style.width = '100%';
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
