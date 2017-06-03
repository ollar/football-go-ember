import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),
  session: Ember.inject.service(),

  beforeModel() {
    return this.get('session').fetch()
      .then(() => {
        if (!this.get('session.isAuthenticated')) {
          this.transitionTo('login');
        }
      })
      .catch(() => {});
  },

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
