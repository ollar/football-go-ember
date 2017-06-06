import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var aa = this.get('session.currentUser.providerData')[0];

    console.log(aa);
    // if ()
    //
    return this.get('session.currentUser.providerData')[0];
  }
});
