import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error(e) {
      alert(e);
    },
  },

  beforeModel() {
    return this.get('session').fetch()
      .then(() => {
        if (!this.get('session.isAuthenticated')) {
          this.transitionTo('login');
        }
      })
      .catch(() => {
        this.transitionTo('login');
      });
  }
});
