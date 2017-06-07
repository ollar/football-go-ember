import Ember from 'ember';

import ToriiSession from 'torii/services/torii-session';

export default ToriiSession.extend({
  register() {
    var owner = Ember.getOwner(this);
    var adapter = owner.lookup('torii-adapter:application');
    return adapter.register(...arguments);
  },
});
