/* globals calculateSize, WebFont */
import { get, set } from '@ember/object';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: 'span',
  classNames: ['x-base'],
  errorMessage: false,
  isEditing: false,
  mouseInsideComponent: false,
  originalValue: null,
  isValid: computed('errorMessage', function() {
    return !get(this, 'errorMessage') ? true : false;
  }),

  /**
   * Sets the isFieldEditing property to the current isEditing status.
   * This is used to pass isEditing out to the controller, if you need it
   * @private
   */
  setFieldIsEditing: observer('isEditing', function() {
    set(this, 'isFieldEditing', get(this, 'isEditing'));
  }),

  didInsertElement() {
    run.later(() => {
      const afterRenderLogic = () => {
        // TODO fix this empty text handling
        // this.handleEmptyTextValue();
        // Store the original value, so we can restore it on cancel click
        set(this, 'originalValue', get(this, 'value'));

        if (get(this, 'value')) {
          this.changeUnderlineSize();
        }
      };

      // If custom font families are being loaded with @font-face,
      // we need to wait until the font is loaded to display the inputs
      if (get(this, 'fontFamilyConfig')) {
        WebFont.load({
          custom: {
            families: get(this, 'fontFamilyConfig')
          },
          active: afterRenderLogic
        });
      } else {
        afterRenderLogic();
      }
    });
  },

  actions: {
    cancelAction() {
      set(this, 'isEditing', false);
      set(this, 'value', get(this, 'originalValue'));
      set(this, 'errorMessage', false);
      this.sendAction('cancelAction');
    },
    saveAction() {
      const validator = get(this, 'validator');
      // Do any validation here, before saving
      if (validator) {
        set(this, 'errorMessage', get(this, 'validator')(get(this, 'value')));

        // If no errors, update the originalValue to be the newly saved value
        if (!get(this, 'errorMessage')) {
          set(this, 'originalValue', get(this, 'value'));
        }
      } else {
        set(this, 'originalValue', get(this, 'value'));
      }
      this.saveNewValue();
    }
  },

  focusIn() {
    if (get(this, 'value') === 'Empty') {
      set(this, 'value', '');
    }
    set(this, 'isValid', true);
    set(this, 'isEditing', true);
  },

  focusOut() {
    if (!get(this, 'mouseInsideComponent')) {
      this.send('cancelAction');
    }
  },

  mouseEnter() {
    set(this, 'mouseInsideComponent', true);
  },

  mouseLeave() {
    set(this, 'mouseInsideComponent', false);
  },

  /**
   * Calculate the width of a text string, given the element to grab styles from and the text string
   * @param element The element the text is inside, this is used to get font size, weight, etc
   * @param text The text string we are measuring
   * @returns {*}
   * @private
   */
  getTextWidth(element, text) {
    const fontFamily = element.css('font-family');
    const fontSize = element.css('font-size');
    const fontWeight = element.css('font-weight');
    return calculateSize(text, {
      font: fontFamily,
      fontSize,
      fontWeight
    });
  },

  saveNewValue() {
    // If no errors, go ahead and save
    if (!get(this, 'errorMessage')) {
      set(this, 'isEditing', false);
      this.changeUnderlineSize();
      this.sendAction('saveAction');
    }
  }
});
