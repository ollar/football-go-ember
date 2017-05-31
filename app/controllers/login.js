import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',
  session: Ember.inject.service(),
  actions: {
    login() {
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
        console.log(res);
      });
    },

    githubSignIn() {
      this.get('session').open('firebase', {
        provider: 'github',
      }).then((res) => {
        console.log(res);
      }).catch((e) => console.log(e));
    },
  }
});
