/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';
import Validators from '../utils/validators';

export default Controller.extend({
  fontFamilyConfig: ['Lato'],
  selectValidator: null,
  selectValue: '2',
  textareaValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac auctor justo. Sed orci orci, laoreet eget diam id, ornare dictum mi. Proin ultrices porttitor sapien eu suscipit. Vestibulum a leo eu quam dapibus cursus. Quisque quis enim ante. Donec aliquam efficitur nibh. Morbi mauris lacus, volutpat quis lacinia vitae, venenatis at turpis. Sed et tempor enim. Nunc molestie nisl a sapien facilisis, sed interdum nunc venenatis.',
  textValue: 'TestString',

  init(){
    this._super(...arguments);

    this.selectContent = [
      { value: '1', text: 'TestString' },
      { value: '2', text: 'LongerTestString' },
      { value: '3', text: 'ReallyReallyLongTestString' }
    ];
  },

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
