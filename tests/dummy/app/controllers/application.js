/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import { A } from '@ember/array';
import Controller from '@ember/controller';
import Validators from '../utils/validators';

export default Controller.extend({
  fontFamilyConfig: ['Lato'],
  selectValidator: null,
  selectValue: '2',
  textValue: 'TestString',

  selectContent: A([
    { value: '1', text: 'TestString' },
    { value: '2', text: 'LongerTestString' },
    { value: '3', text: 'ReallyReallyLongTestString' }
  ]),

  actions: {
    cancelAction() {
      console.log('cancel');
    },
    saveAction() {
      console.log('save');
    }
  },

  textValidator: Validators.RequiredString
});
