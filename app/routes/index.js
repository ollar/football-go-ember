import Ember from 'ember';

export default Ember.Route.extend({
  nextWednesday: Ember.inject.service(),

  model() {
    var date = this.get('nextWednesday').get('serverDate');

    return this.get('store').query('match', {
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
    }).catch(err => this.send('error', err));
  }
});
