import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),

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
