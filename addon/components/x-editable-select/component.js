import { get } from '@ember/object';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import XBaseComponent from '../x-base/component';
import layout from './template';

export default XBaseComponent.extend({
  layout,
  changeUnderlineSize: observer('isEditing', function() {
    run.later(() => {
      const borderBottom = this.element.querySelector('.borderBottom');
      const select = this.element.querySelector('select');
      const selectContainer = this.element.querySelector('.selectContainer');
      const { text } = select.options[select.selectedIndex];

      if (!get(this, 'isEditing')) {
        const size = this.getTextWidth(select, text);
        selectContainer.style.width = 'auto';
        selectContainer.style.height = `${size.height + 16}px`;
        select.style.width = `${size.width + 2}px`;
        select.style.height = `${size.height + 11}px`;
        borderBottom.style.width = size.width;
      } else {
        selectContainer.style.width = '68%';
        selectContainer.style.height = 'auto';
        select.style.width = '100%';
      }
    });
  })
});
