import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),
  getUser: Ember.inject.service(),

  model() {
    var date = this.get('nextWednesday').get('serverDate');

    console.log(this.get('getUser'));

    return Ember.RSVP.hash({
      match: this.get('store').query('match', {
        orderBy: 'date',
        equalTo: date,
      }).then((matches) => {
        return matches.get('firstObject');
      }).catch(err => this.send('error', err)),
      me: this.get('store').query('player', {
        orderBy: 'email',
        equalTo: 'olegollar@gmail.com',
      }).then((res) => {
        console.log(res);
      })
    })
  }
});
