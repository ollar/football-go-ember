import Ember from 'ember';

export default Ember.Controller.extend({
  nextWednesday: Ember.inject.service(),
  session: Ember.inject.service(),
  humanDate: Ember.computed('nextWednesday.humanDate', function() {
    return this.get('nextWednesday.humanDate');
  }),
  actions: {
    submitGo() {
      this.get('store').query('player', {
        orderBy: 'email',
        equalTo: this.getUser().email,
      })
      .then((players) => {
        var player = players.get('firstObject');

        this.get('store').query('match', {
          orderBy: 'date',
          equalTo: this.get('nextWednesday').get('serverDate'),
        }).then((matches) => {
          if (matches.get('length') === 0) {
            var match = this.get('store').createRecord('match', {
              date: this.get('nextWednesday').get('serverDate'),
              UTCdate: this.get('nextWednesday').nw,
            });

            match.get('players').pushObject(player)

            return match.save();
          } else if (matches.get('length') === 1) {
            let match = matches.get('firstObject');
            match.get('players').pushObject(player);
          } else {
            throw new Error('dulication is matched');
          }

          matches.save();
        });
      });

    }
  },

  players: Ember.computed('model.players', function() {
    return this.model.get('players');
  }),

  getUser() {
    return this.get('session.currentUser.providerData')[0];
  }
});
