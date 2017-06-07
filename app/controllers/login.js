import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',

  getUser: Ember.inject.service(),

  createUser() {
    var userData = this.get('getUser').get('user');

    this.get('store').query('player', {
      orderBy: 'email',
      equalTo: userData.email,
    }).then((res) => {
      if (res && res.get('length') === 0) {
        let player = this.get('store').createRecord('player', {
          name: userData.displayName,
          photoURL: userData.photoURL,
          email: userData.email,
        });

        player.save();
      }
    });
  },

  actions: {
    passwordSignIn() {
      if (!this.get('email') || !this.get('password')) {
        return;
      }
      return this.get('session').open('firebase', {
        provider: 'password',
        email: this.get('email'),
        password: this.get('password'),
      })
      .then(() => {
        this.transitionToRoute('index');
      });
    },

    googleSignIn() {
      return this.get('session').open('firebase', {
        provider: 'google',
        settings: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email,' +
            'https://www.googleapis.com/auth/userinfo.profile'
        }
      }).then(() => {
        this.createUser();
        this.transitionToRoute('index');
      }).catch((e) => {
        this.send('error', e)
      });
    },

    githubSignIn() {
      return this.get('session').open('firebase', {
        provider: 'github',
      }).then(() => {
        this.createUser();
        this.transitionToRoute('index');
      }).catch((e) => {
        this.send('error', e)
      });
    },
  }
});
