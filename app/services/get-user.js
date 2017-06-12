import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  user: Ember.computed('session.isAuthenticated', function() {
    // if (!this.get('session.currentUser.providerData')) {
    //   return {};
    // }

    const email = this.get('session.currentUser.email');

    if (!this.get('session.isAuthenticated')) {
      return {};
    }

    return this.get('store').query('player', {
      orderBy: 'email',
      equalTo: email,
    }).then((players) => {
      return players.get('firstObject');
    });


    // return this.get('session.currentUser.providerData')[0];
  }),
});
