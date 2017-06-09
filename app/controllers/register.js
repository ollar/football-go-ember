import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import validateRegister from '../validators/register';

export default Ember.Controller.extend({
  fields: {
    name: '',
    email: '',
    password: '',
  },

  init() {
    this._super(...arguments);

    this.changeset = new Changeset(this.get('fields'), lookupValidator(validateRegister), validateRegister);
  },

  actions: {
    register() {
      this.changeset.validate().then(() => {
        if (this.changeset.get("isValid")) {
          this.changeset.save();

          this.get('session').register(this.changeset.get('email'), this.changeset.get('password'))
            .then((newPlayer) => {
              newPlayer.updateProfile({
                displayName: this.changeset.get('name'),
              });

              let player = this.get('store').createRecord('player', {
                name: this.changeset.get('name'),
                photoURL: '',
                email: this.changeset.get('email'),
              });

              player.save();
            })
            .then(() => {
              this.get('session').fetch().then(() => {
                this.transitionToRoute('index');
              });
            })

            .catch((e) => {
              this.send('notify', 'error', e.toString());
            });
        } else {
          this.send('notify', 'error', 'form is invalid');
        }
      });
    },
  },
});
