import Ember from 'ember';

import ToriiSession from 'torii/services/torii-session';

export default ToriiSession.extend({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.addObserver('isAuthenticated', this, () => {
      if (this.get('isAuthenticated')) {
        this.get('store').query('player', {
          orderBy: 'email',
          equalTo: this.get('currentUser.email'),
        }).then((users) => {
          if (users.get('length') === 1) {
            this.get('store').createRecord('me', users.get('firstObject').toJSON());
          }
        });
      } else {
        const user = this.get('store').peekAll('me').get('firstObject');
        if (user) user.deleteRecord();
      }
    });
  },
  register() {
    var owner = Ember.getOwner(this);
    var adapter = owner.lookup('torii-adapter:application');
    return adapter.register(...arguments);
  },
});
