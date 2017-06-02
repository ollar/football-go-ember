import Ember from 'ember';

export default Ember.Controller.extend({
  maps: Ember.inject.service(),

  energetiks: Ember.computed('maps', function() {
    return this.get('maps').createMap(
      'https://api-maps.yandex.ru/frame/v1/-/CZc2VR3z',
      'energetiks'
    );
  }),

  zanevskij: Ember.computed('maps', function() {
    return this.get('maps').createMap(
      'https://api-maps.yandex.ru/frame/v1/-/CZc2VDoM',
      'zanevskij'
    );
  }),
});
