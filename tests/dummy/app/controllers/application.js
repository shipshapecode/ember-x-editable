import Ember from 'ember';
import Validators from '../utils/validators';

export default Ember.Controller.extend({
  fontFamilyConfig: ['Lato'],
  selectContent: Ember.A([
    {value: 1, text: 'TestString'},
    {value: 2, text: 'LongerTestString'},
    {value: 3, text: 'ReallyReallyLongTestString'}
  ]),
  selectValidator: null,
  selectValue: 2,
  textValue: 'TestString',
  textValidator: Validators.RequiredString,
  actions: {
    cancelAction: function () {
      console.log('cancel');
    },
    saveAction: function () {
      console.log('save');
    }
  }
});
