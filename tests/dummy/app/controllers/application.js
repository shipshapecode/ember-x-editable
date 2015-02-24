import Ember from 'ember';
import Validators from '../utils/validators';

export default Ember.Controller.extend({
  selectContent: Ember.A([
    {value: 1, text: 'TestString'},
    {value: 2, text: 'LongerTestString'},
    {value: 3, text: 'ReallyReallyLongTestString'}
  ]),
  selectValidator: null,
  textValidator: Validators.RequiredString,
  actions: {
    cancelAction: function() {
      console.log('cancel');
    },
    saveAction: function() {
      console.log('save');
    }
  }
});
