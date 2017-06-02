import Ember from 'ember';

export default Ember.Controller.extend({
  nextWednesday: Ember.inject.service(),
  players: [],
  humanDate: Ember.computed('nextWednesday.humanDate', function() {
    return this.get('nextWednesday.humanDate');
  }),
});
