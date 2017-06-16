import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validateLogin from '../validations/login';

export default Ember.Controller.extend({
  fields: {
    email: '',
    password: '',
  },

  getUser: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this.get('fields'), lookupValidator(validateLogin), validateLogin);
  },

  createUser() {
    var userData = this.get('getUser').get('user');

    return this.get('store').query('player', {
      orderBy: 'email',
      equalTo: userData.email,
    }).then((res) => {
      if (res && res.get('length') === 0) {
        let player = this.get('store').createRecord('player', {
          name: userData.displayName,
          photoURL: userData.photoURL,
          email: userData.email,
        });

        return player.save();
      }

      return true;
    });
  },

  actions: {
    passwordSignIn() {
      this.changeset.validate().then(() => {
        if (this.changeset.get("isValid")) {
          this.changeset.save();
          return this.get('session').open('firebase', {
            provider: 'password',
            email: this.changeset.get('email'),
            password: this.changeset.get('password'),
          })
          .then(() => {
            this.send('notify', 'info', this.get('i18n').t('messages.welcome_default'));
            this.transitionToRoute('index');
          })
          .catch((e) => {
            this.send('notify', 'error', e.toString());
          });
        }
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
        this.createUser()
          .then(() => {
            this.send('notify', 'info', this.get('i18n').t('messages.welcome_google'));
            this.transitionToRoute('index');
          });
      }).catch((e) => {
        this.send('notify', 'error', e.toString());
      });
    },

    githubSignIn() {
      return this.get('session').open('firebase', {
        provider: 'github',
      }).then(() => {
        this.createUser()
          .then(() => {
            this.send('notify', 'info', this.get('i18n').t('messages.welcome_github'));
            this.transitionToRoute('index');
          });
      }).catch((e) => {
        this.send('notify', 'error', e.toString());
      });
    },
  }
});
