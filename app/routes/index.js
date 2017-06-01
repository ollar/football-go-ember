import Ember from 'ember';

export default Ember.Route.extend({
  players: [],
  nextWednesday: Ember.inject.service(),

  humanDate: Ember.computed('nextWednesday.humanDate', function() {
    return this.get('nextWednesday.humanDate');
  }),

  model() {
    var date = this.get('nextWednesday').get('serverDate');

    return this.get('store').findRecord('match', date)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
