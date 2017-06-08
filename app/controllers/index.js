import Ember from 'ember';

export default Ember.Controller.extend({
  nextWednesday: Ember.inject.service(),
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

  players: Ember.computed.alias('model.match.players'),

  isInTeam: Ember.computed('players', function() {
    return this.get('players').includes(this.model.me);
  }),
});
