import Ember from 'ember';

export default Ember.Service.extend({
  cachedMaps: {},

  createMap(href, name) {
    if (this.get('cachedMaps')[name])
      return this.get('cachedMaps')[name];

    var map = document.createElement('iframe');
    map.src = href;
    map.height = 400;
    map.className = 'ym';

    this.get('cachedMaps').name = map;

    return map;
  }
});
