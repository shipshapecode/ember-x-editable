import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import XBaseComponent from '../x-base/component';
import layout from './template';

export default XBaseComponent.extend({
  layout,
  changeUnderlineSize: observer('isEditing', function() {
    run.later(() => {
      if (!this.get('isEditing')) {
        if (this.get('value') && this.get('value').length > 0) {
          const size = this.getTextWidth(this.$('input'), this.get('value'));
          this.$('.textContainer').width('68%');
          this.$('input').width(size.width + 10);
          this.$('.borderBottom').width(size.width);
        }
      }
    });
  }),
  /**
   * This is a computed property for adding/removing the is-empty class
   * @private
   */
  isEmpty: computed('isEditing', function() {
    if (!this.get('isEditing')) {
      if (!this.get('value') || this.get('value') === '' || this.get('value') === 'Empty') {
        return true;
      }
    }
    return false;
  }),
  makeFullWidthWhenEditing: observer('isEditing', function() {
    this.$('input').width('100%');
  }),
  /**
   * Set the value to the string 'Empty' when value is null, undefined, or ''.
   * @private
   */
  handleEmptyValue() {
    if (!this.get('value') || this.get('value') === '') {
      this.set('value', 'Empty');
    }
  },
  actions: {
    saveAction() {
      if (!this.get('validator')) {
        this.handleEmptyValue();
      }
      this._super(...arguments);
    }
  }
});
