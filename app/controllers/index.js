import Ember from 'ember';

export default Ember.Controller.extend({
  nextWednesday: Ember.inject.service(),
  getUser: Ember.inject.service(),

  me: Ember.computed.readOnly('getUser.user'),

  humanDate: Ember.computed('nextWednesday.humanDate', function() {
    return this.get('nextWednesday.humanDate');
  }),
  actions: {
    submitGo() {
      this.model.get('players').pushObject(this.get('me'));
      this.model.save();
    },
    changeMind(player) {
      this.model.get('players').removeObject(player);
      this.model.save();
    },
  },

  players: Ember.computed.alias('model.players.[]'),

  isInTeam: Ember.computed('players', function() {
    return this.get('players').includes(this.get('me'));
  }),
});
