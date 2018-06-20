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
          const borderBottom = this.element.querySelector('.borderBottom');
          const textarea = this.element.querySelector('textarea');
          const textContainer = this.element.querySelector('.textareaContainer');
          const size = this.getTextWidth(textarea, get(this, 'value'));
          textContainer.style.width = '68%';
          textarea.style.width = `${size.width + 10}px`;
          borderBottom.style.width = `${size.width + 3}px`;
        }
      }
    });
  }),

  makeFullWidthWhenEditing: observer('isEditing', function() {
    this.element.querySelector('textarea').style.width = '100%';
  }),

  focusOut() {
    const textarea = this.element.querySelector('textarea');
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;

    this._super(...arguments);
  },

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
