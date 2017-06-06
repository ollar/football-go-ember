import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),
  getUser: Ember.inject.service(),

  model() {
    var date = this.get('nextWednesday').get('serverDate');
    var user = this.get('getUser').get('user');

    return Ember.RSVP.hash({
      match: this.get('store').query('match', {
        orderBy: 'date',
        equalTo: date,
      }).then((matches) => {
        if (matches.get('length')) {
          return matches.get('firstObject');
        }
        return this.get('store').createRecord('match', {
          date: this.get('nextWednesday').get('serverDate'),
          UTCdate: this.get('nextWednesday').nw,
        });
      }).catch(err => this.send('error', err)),
      me: this.get('store').query('player', {
        orderBy: 'email',
        equalTo: user.email,
      }).then((players) => {
        return players.get('firstObject');
      }).catch(err => this.send('error', err)),
    })
  }
});
