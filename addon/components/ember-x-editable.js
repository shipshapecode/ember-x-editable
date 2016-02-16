/* globals calculateSize, WebFont */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['editable-container', 'editable-inline'],
  tagName: 'span',
  errorMessage: false,
  isEditing: false,
  mouseInsideComponent: false,
  originalValue: null,
  isValid: Ember.computed('errorMessage', function () {
    return !this.get('errorMessage') ? true : false;
  }),
  changeUnderlineSize: Ember.observer('isEditing', function () {
    Ember.run.later(() => {
      let size;
      if (this.get('isText') && !this.get('isEditing')) {
        if (this.get('value') && this.get('value').length > 0) {
          size = this.getTextWidth(this.$('input'), this.get('value'));
          this.$('.textContainer').width('68%');
          this.$('input').width(size.width + 10);
          this.$('.borderBottom').width(size.width);
        }
      }
      else if (this.get('isSelect')) {
        if (!this.get('isEditing')) {
          size = this.getTextWidth(this.$('select'), this.$('select option:selected').text());
          this.$('.selectContainer').css('width', 'auto');
          this.$('.selectContainer').height(size.height + 8);
          this.$('select').width(size.width);
          this.$('select').height(size.height + 7);
          this.$('.borderBottom').css('width', size.width);
        }
        else {
          this.$('.selectContainer').css('width', '68%');
          this.$('.selectContainer').height('auto');
          this.$('select').css('width', '100%');
        }
      }
    });
  }),
  makeFullWidthWhenEditing: Ember.observer('isEditing', function () {
    if (this.get('isText')) {
      this.$('input').width('100%');
    }
  }),
  /**
   * Sets the isFieldEditing property to the current isEditing status.
   * This is used to pass isEditing out to the controller, if you need it
   */
  setFieldIsEditing: Ember.observer('isEditing', function () {
    this.set('isFieldEditing', this.get('isEditing'));
  }),
  classes: Ember.computed('isEditing', 'errorMessage', function () {
    let classNames = '';
    if (this.get('isText')) {
      classNames += 'ember-x-editable-text input-sm';
    }
    if (this.get('isSelect')) {
      classNames += 'ember-x-editable-select input-sm';
    }
    if (!this.get('isEditing')) {
      if (!this.get('value') || this.get('value') === '' || this.get('value') === 'Empty') {
        classNames += ' is-empty';
      }
      classNames += ' is-not-editing';
    }
    else {
      classNames += ' is-editing';
    }
    if (this.get('errorMessage')) {
      classNames += ' error';
    }
    return classNames;
  }),
  isSelect: Ember.computed('type', function () {
    return this.get('type') === 'select';
  }),
  isText: Ember.computed('type', function () {
    return this.get('type') === 'text';
  }),
  focusIn() {
    if (this.get('value') === 'Empty') {
      this.set('value', '');
    }
    this.set('isValid', true);
    this.set('isEditing', true);
  },
  focusOut() {
    if (!this.get('mouseInsideComponent')) {
      this.send('cancelAction');
    }
  },
  mouseEnter() {
    this.set('mouseInsideComponent', true);
  },
  mouseLeave() {
    this.set('mouseInsideComponent', false);
  },
  /**
   * Calculate the width of a text string, given the element to grab styles from and the text string
   * @param element The element the text is inside, this is used to get font size, weight, etc
   * @param text The text string we are measuring
   * @returns {*}
   */
  getTextWidth(element, text) {
    const fontFamily = element.css('font-family');
    const fontSize = element.css('font-size');
    const fontWeight = element.css('font-weight');
    return calculateSize(text, {
      font: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight
    });
  },
  actions: {
    cancelAction() {
      this.set('isEditing', false);
      this.set('value', this.get('originalValue'));
      this.set('errorMessage', false);
      this.sendAction('cancelAction');
    },
    saveAction() {
      const validator = this.get('validator');
      //Do any validation here, before saving
      if (validator) {
        this.set('errorMessage', this.get('validator')(this.get('value')));

        //If no errors, update the originalValue to be the newly saved value
        if (!this.get('errorMessage')) {
          this.set('originalValue', this.get('value'));
        }
      }
      else {
        this.handleEmptyTextValue();
        this.set('originalValue', this.get('value'));
      }
      this.saveNewValue();
    }
  },
  saveNewValue() {
    //If no errors, go ahead and save
    if (!this.get('errorMessage')) {
      this.set('isEditing', false);
      this.changeUnderlineSize();
      this.sendAction('saveAction');
    }
  },
  handleEmptyTextValue() {
    if (this.get('isText')) {
      if (!this.get('value') || this.get('value') === '') {
        this.set('value', 'Empty');
      }
    }
  },
  didInsertElement() {
    Ember.run.later(() => {
      const afterRenderLogic = () => {
        this.handleEmptyTextValue();
        //Store the original value, so we can restore it on cancel click
        this.set('originalValue', this.get('value'));

        if (this.get('value')) {
          this.changeUnderlineSize();
        }
      };

      // If custom font families are being loaded with @font-face,
      // we need to wait until the font is loaded to display the inputs
      if (this.get('fontFamilyConfig')) {
        WebFont.load({
          custom: {
            families: this.get('fontFamilyConfig')
          },
          active: afterRenderLogic
        });
      }
      else {
        afterRenderLogic();
      }
    });
  }
});
