import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  email: '',
  password: '',

  actions: {
    register() {
      this.get('session').register(this.get('email'), this.get('password'))
        .then((newPlayer) => {
          newPlayer.updateProfile({
            displayName: this.get('name'),
          });

          let player = this.get('store').createRecord('player', {
            name: this.get('name'),
            photoURL: '',
            email: this.get('email'),
          });

          player.save();
        })
        .then(() => {
          this.get('session').fetch();
          this.transitionToRoute('index');
        })

        .catch((e) => {
          this.send('error', e);
        })
    },
  },
});
