import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import XBaseComponent from '../x-base/component';
import layout from './template';

export default XBaseComponent.extend({
  layout,
  changeUnderlineSize: observer('isEditing', function() {
    run.later(() => {
      if (!this.get('isEditing')) {
        const size = this.getTextWidth(this.$('select'), this.$('select option:selected').text());
        this.$('.selectContainer').css('width', 'auto');
        this.$('.selectContainer').height(size.height + 8);
        this.$('select').width(size.width);
        this.$('select').height(size.height + 7);
        this.$('.borderBottom').css('width', size.width);
      } else {
        this.$('.selectContainer').css('width', '68%');
        this.$('.selectContainer').height('auto');
        this.$('select').css('width', '100%');
      }
    });
  })
});
