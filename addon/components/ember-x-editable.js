import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['editable-container', 'editable-inline'],
  tagName: 'span',
  errorMessage: false,
  isValid: function() {
    return !this.get('errorMessage') ? true : false;
  }.property('errorMessage'),
  mouseInsideComponent: false,
  originalValue: null,
  classes: function() {
    var classNames = '';
    if (this.get('isText')) {
      classNames += 'ember-x-editable-text input-sm';
    }
    if (this.get('isSelect')) {
      classNames += 'ember-x-editable-select input-sm';
    }
    if (!this.get('isEditing')) {
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
        this.set('errorMessage', this.get('validator')(this.get('content')));
        //If no errors, update the originalValue to be the newly saved value
        if (!this.get('errorMessage')) {
          this.set('originalValue', this.get('content'));
        }
      }
      else if (this.get('isSelect')) {
        this.set('errorMessage', this.get('validator')(this.get('selectedValue')));
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
      if (this.get('isText') && this.get('content')) {
        this.set('originalValue', this.get('content'));
      }
      if (this.get('isSelect') && this.get('selectedValue')) {
        this.set('originalValue', this.get('selectedValue'));
      }
    });

  },
  valueChanged: function() {

  }.observes('selectedValue')
});
