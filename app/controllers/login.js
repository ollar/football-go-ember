import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',

  isAuthenticated: Ember.computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),

  actions: {
    register() {

      console.log(this.get('session'));

      this.get('session').register();
    },


    passwordSignIn() {
      if (!this.get('email') || !this.get('password')) {
        return;
      }
      this.get('session').open('firebase', {
        provider: 'password',
        email: this.get('email'),
        password: this.get('password'),
      });
    },

    googleSignIn() {
      this.get('session').open('firebase', {
        provider: 'google',
        settings: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email,' +
            'https://www.googleapis.com/auth/userinfo.profile'
        }
      }).then(() => {
        var userData = this.get('session.currentUser.providerData')[0];

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

          this.transitionToRoute('index');
        });
      }).catch((e) => {
        this.send('error', e)
      });
    },

    githubSignIn() {
      this.get('session').open('firebase', {
        provider: 'github',
      }).then(() => {
        this.transitionToRoute('index');
      }).catch((e) => {
        this.send('error', e)
      });
    },

    signOut() {
      this.get('session').close();
    },
  }
});
