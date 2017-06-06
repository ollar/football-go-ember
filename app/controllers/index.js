import Ember from 'ember';

export default Ember.Controller.extend({
  nextWednesday: Ember.inject.service(),
  session: Ember.inject.service(),
  humanDate: Ember.computed('nextWednesday.humanDate', function() {
    return this.get('nextWednesday.humanDate');
  }),
  actions: {
    submitGo() {
      this.model.match.get('players').pushObject(this.model.me);
      this.model.match.save();
    },
    changeMind(player) {
      this.model.match.get('players').removeObject(player);
      this.model.match.save();
    },
  },

  players: Ember.computed('model.match.players', function() {
    return this.model.match.get('players');
  }),

  isInTeam: Ember.computed('players', function() {
    console.log('aha');
    return this.get('players').includes(this.model.me);
  }),

  getUser() {
    return this.get('session.currentUser.providerData')[0];
  },
});
