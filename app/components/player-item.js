import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['player'],
  init() {
    this._super(...arguments);
    this.elementId = this.get('player.id');

    if (this.elementId === this.get('me.id')) {
      this.set('classNames', [...this.get('classNames'), 'me']);
    }
  },

  isMe: Ember.computed(function() {
    return this.elementId === this.get('me.id');
  }),

  actions: {
    changeMind() {
      return this.get('changeMind')(this.get('me'));
    },
  }
});
