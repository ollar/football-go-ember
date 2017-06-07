import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    return this.get('session').fetch()
      .catch(() => {
        if (['login', 'register'].indexOf(transition.targetName) > -1) {
          return;
        }
        return this.transitionTo('login');
      });
  },

  actions: {
    error(e) {
      alert(e);
    },
  },
});
