import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error(e) {
      alert(e);
    },
  },

  beforeModel() {
    return this.get('session').fetch()
      .catch(() => {
        this.transitionTo('login');
      });
  }
});
