import Ember from 'ember';
const { A, Controller, Logger } = Ember;
import Validators from '../utils/validators';

export default Controller.extend({
  fontFamilyConfig: ['Lato'],
  selectContent: A([
    { value: '1', text: 'TestString' },
    { value: '2', text: 'LongerTestString' },
    { value: '3', text: 'ReallyReallyLongTestString' }
  ]),
  selectValidator: null,
  selectValue: '2',
  textValue: 'TestString',
  textValidator: Validators.RequiredString,
  actions: {
    cancelAction() {
      Logger.log('cancel');
    },
    saveAction() {
      Logger.log('save');
    }
  }
});
