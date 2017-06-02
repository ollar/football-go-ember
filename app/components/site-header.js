import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  user: Ember.computed('session.{currentUser,isAuthenticated}', function() {
    if (!this.get('session.isAuthenticated')) {
      return {};
    }

    return this.get('session.currentUser.providerData')[0];
  }),

  actions: {
    signOut() {
      this.get('session').close();
    },
  }
});
