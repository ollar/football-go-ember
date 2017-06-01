import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',
  session: Ember.inject.service(),

  beforeModel() {
    this.get('session').fetch();
  },

  isAuthenticated: Ember.computed('session.isAuthenticated', function() {
    return this.get('session').get('isAuthenticated');
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
      }).then((res) => {
        console.log(this.get('session'));
        console.log(res);
      }).catch((e) => console.log(e));
    },

    githubSignIn() {
      this.get('session').open('firebase', {
        provider: 'github',
      }).then((res) => {
        console.log(res);
      }).catch((e) => console.log(e));
    },

    signOut() {
      this.get('session').close();
    },
  }
});
