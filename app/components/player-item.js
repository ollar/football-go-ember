import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['player'],
  init() {
    this._super(...arguments);
    this.elementId = this.get('player.id');
  },
});
