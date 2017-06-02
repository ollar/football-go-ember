import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',
  session: Ember.inject.service(),

  beforeModel() {
    this.get('session').fetch();
  },

  isAuthenticated: Ember.computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),

  actions: {
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
        this.transitionToRoute('index');
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
