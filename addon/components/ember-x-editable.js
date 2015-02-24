/* globals calculateSize */
import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  classNames: ['editable-container', 'editable-inline'],
  tagName: 'span',
  errorMessage: false,
  isValid: function() {
    return !this.get('errorMessage') ? true : false;
  }.property('errorMessage'),
  mouseInsideComponent: false,
  originalValue: null,
  changeSelectedUnderlineSize: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (this.get('isSelect')) {
        var size = this.getTextWidth(this.$('select'), this.$('select option:selected').text());
        this.$('.borderBottom').width(size.width);
      }
    });
  },
  changeTextUnderlineSize: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (this.get('isText')) {
        if (this.get('content') && this.get('content').length > 0) {
          var size = this.getTextWidth(this.$('input'), this.get('content'));
          this.$('input').attr('size', this.get('content').length + 4);
          this.$('.borderBottom').width(size.width);
        }
      }
    });
  },
  classes: function() {
    var classNames = '';
    if (this.get('isText')) {
      classNames += 'ember-x-editable-text input-sm';
    }
    if (this.get('isSelect')) {
      classNames += 'ember-x-editable-select input-sm';
    }
    if (!this.get('isEditing')) {
      if (!this.get('content') || this.get('content') === '' || this.get('content') === 'Empty') {
        classNames += ' is-empty';
      }
      classNames += ' is-not-editing';
    } else {
      classNames += ' is-editing';
    }
    return classNames;
  }.property('isEditing'),
  isEditing: false,
  isSelect: function() {
    return this.get('type') === 'select';
  }.property('type'),
  isText: function() {
    return this.get('type') === 'text';
  }.property('type'),
  focusIn: function() {
    if (this.get('content') === 'Empty') {
      this.set('content', '');
    }
    this.set('isValid', true);
    this.set('isEditing', true);
  },
  focusOut: function() {
    if (!this.get('mouseInsideComponent')) {
      this.send('cancelAction');
    }
  },
  mouseEnter: function() {
    this.set('mouseInsideComponent', true);
  },
  mouseLeave: function() {
    this.set('mouseInsideComponent', false);
  },
  /**
   * Calculate the width of a text string, given the element to grab styles from and the text string
   * @param element The element the text is inside, this is used to get font size, weight, etc
   * @param text The text string we are measuring
   * @returns {*}
   */
  getTextWidth: function(element, text) {
    var fontFamily = element.css('font-family');
    var fontSize = element.css('font-size');
    var fontWeight = element.css('font-weight');
    var size = calculateSize(text, {
      font: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight
    });
    return size;
  },
  actions: {
    cancelAction: function() {
      this.set('isEditing', false);
      if (this.get('isSelect')) {
        this.set('selectedValue', this.get('originalValue'));
      }
      if (this.get('isText')) {
        this.set('content', this.get('originalValue'));
      }
      this.set('errorMessage', false);
      this.sendAction('cancelAction');
    },
    saveAction: function() {
      //Do any validation here, before saving
      if (this.get('isText')) {
        if (this.get('validator')) {
          this.set('errorMessage', this.get('validator')(this.get('content')));

          //If no errors, update the originalValue to be the newly saved value
          if (!this.get('errorMessage')) {
            this.set('originalValue', this.get('content'));
          }
        }
        else if (!this.get('content') || this.get('content') === '') {
          this.set('content', 'Empty');
        }
        //If no errors, go ahead and save
        if (!this.get('errorMessage')) {
          this.set('isEditing', false);
          this.changeTextUnderlineSize();
          this.sendAction('saveAction');
        }
      }
      else if (this.get('isSelect')) {
        if (this.get('validator')) {
          this.set('errorMessage', this.get('validator')(this.get('selectedValue')));
        }
        this.set('originalValue', this.get('selectedValue'));
        //If no errors, go ahead and save
        if (!this.get('errorMessage')) {
          this.set('isEditing', false);
          this.changeSelectedUnderlineSize();
          this.sendAction('saveAction');
        }
      }
    }
  },
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      //Store the original value, so we can restore it on cancel click
      if (this.get('isText')) {
        if (!this.get('content') || this.get('content') === '') {
          this.set('content', 'Empty');
        }
        this.changeTextUnderlineSize();
        this.set('originalValue', this.get('content'));
      }
      if (this.get('isSelect') && this.get('selectedValue')) {
        this.set('originalValue', this.get('selectedValue'));
        this.changeSelectedUnderlineSize();
      }
    });
  }
});
