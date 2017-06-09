import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  user: Ember.computed('session.currentUser.providerData', function() {
    if (!this.get('session.currentUser.providerData')) {
      return {};
    }
    return this.get('session.currentUser.providerData')[0];
  }),
});
