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
    if (this.get('isSelect')) {
      var fontFamily = this.$('select').css('font-family');
      var fontSize = this.$('select').css('font-size');
      var fontWeight = this.$('select').css('font-weight');
      var size = calculateSize(this.$('select option:selected').text(), {
        font: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight
      });
      this.$('.borderBottom').width(size.width);
    }
  }.observes('selectedValue'),
  changeTextUnderlineSize: function() {
    if (this.get('isText')) {
      if (this.get('content') && this.get('content').length > 0) {
        var fontFamily = this.$('input').css('font-family');
        var fontSize = this.$('input').css('font-size');
        var fontWeight = this.$('input').css('font-weight');
        this.$('input').attr('size', this.get('content').length * 8 + 2);
        var size = calculateSize(this.get('content'), {
          font: fontFamily,
          fontSize: fontSize,
          fontWeight: fontWeight
        });
        this.$('.borderBottom').width(size.width);
      }
    }
  }.observes('content'),
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
  getTextWidth: function() {
    var html_org = $(this).html();
    var html_calc = '<span>' + html_org + '</span>';
    $(this).html(html_calc);
    var width = $(this).find('span:first').width();
    $(this).html(html_org);
    return width;
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
      }
      else if (this.get('isSelect')) {
        if (this.get('validator')) {
          this.set('errorMessage', this.get('validator')(this.get('selectedValue')));
        }
        this.set('originalValue', this.get('selectedValue'));
      }
      //If no errors, go ahead and save
      if (!this.get('errorMessage')) {
        this.set('isEditing', false);
        this.sendAction('saveAction');
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

  },
  valueChanged: function() {

  }.observes('selectedValue')
});
