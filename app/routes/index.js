import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),

  model() {
    var date = this.get('nextWednesday').get('serverDate');

    return this.get('store').query('match', {
      orderBy: 'date',
      equalTo: date,
    }).then((matches) => {
      return matches.get('firstObject');
    })
      .catch(err => this.send('error', err));
  }
});
