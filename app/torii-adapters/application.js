import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import Ember from 'ember';

export default ToriiFirebaseAdapter.extend({
  // register() {
  //   return this.get('firebaseApp').auth().createUserWithEmailAndPassword()
  //   .catch(function(error) {
  //     Ember.getOwner(this).send('error', error);
  //   });
  // },
  init() {
    this._super(...arguments);

    // console.log('aaa', this);
  },
  ololo() {
    return '4';
  }
});
