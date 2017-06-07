import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import Ember from 'ember';

export default ToriiFirebaseAdapter.extend({
  register() {
    return this.get('firebaseApp').auth().createUserWithEmailAndPassword('ollolo@ya.ru', '123456')
    .catch((error) => {
      Ember.getOwner(this).lookup('route:application').send('error', error);
    });
  },
});
