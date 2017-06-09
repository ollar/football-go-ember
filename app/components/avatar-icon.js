import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-avatar'],
  colours: [
    '#b71c1c',
    '#880e4f',
    '#4a148c',
    '#01579b',
    '#006064',
    '#827717',
    '#f57f17',
    '#e65100',
    '#bf360c',
    '#3e2723',
  ],
  initials: Ember.computed('user.{displayName,name}', function() {
    var displayName = this.get('user').displayName ||
      this.get('user').get('name') || 'anonymous';

    return displayName
      .split(' ')
      .map(item => item[0].toUpperCase())
      .slice(0,2)
      .join('');
  }),
  backgroundColour: Ember.computed('initials', function() {
    var colourNumber = this.get('initials')
      .split('')
      .map((item) => item.charCodeAt())
      .reduce((sum, i) => sum + i);

    var index = colourNumber % this.get('colours').length;

    return this.get('colours')[index];
  }),
  didRender() {
    this._super(...arguments);
    this.$().css('backgroundColor', this.get('backgroundColour'));
  },
});
