import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Controller.extend({
  getUser: Ember.inject.service(),

  playerId: Ember.computed.readOnly('model.id'),
  myId: Ember.computed.readOnly('getUser.user.id'),

  me: Ember.computed.alias('getUser.user'),

  isMe: Ember.computed('playerId', 'myId', function() {
    return this.get('playerId') === this.get('myId');
  }),

  actions: {
    uploadImage(file) {
      if (this.get('playerId') !== this.get('myId')) return;
      firebase.storage().ref(`players/${this.get('model.id')}`).put(file)
        .then((snapshot) => {
          this.get('me').set('photoURL', snapshot.downloadURL);
          this.get('me').save();
        })
        .catch(() => false);
    },

    removeImage() {
      if (this.get('playerId') !== this.get('myId')) return;

      firebase.storage().ref(`players/${this.get('model.id')}`).delete();
      this.get('me').set('photoURL', '');
      this.get('me').save();
    },
  }
});
