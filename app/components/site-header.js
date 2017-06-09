import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  getUser: Ember.inject.service(),
  tagName: 'header',

  user: Ember.computed.readOnly('getUser.user'),

  actions: {
    signOut() {
      this.get('session').close()
        .then(() => {
          return Ember.getOwner(this).get('router').transitionTo('login');
        });
    },
  }
});
