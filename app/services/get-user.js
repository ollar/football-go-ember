import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  user: Ember.computed('session.isAuthenticated', function() {
    let currentUser = {};

    if (!this.get('session.currentUser.providerData')) {
      return currentUser;
    }

    currentUser = Object.assign({}, this.get('session.currentUser.providerData')[0]);

    currentUser.displayName = currentUser.displayName ||
      this.get('session.currentUser.displayName');

    return currentUser;
  }),
});
