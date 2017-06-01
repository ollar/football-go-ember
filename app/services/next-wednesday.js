import Ember from 'ember';
import wednesdayUtil from '../utils/next-wednesday';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.nw = wednesdayUtil();
  },

  serverDate: Ember.computed('date', function() {
    const dateArr = [
      this.nw.getFullYear(),
      this.nw.getMonth() + 1,
      this.nw.getDate()
    ];

    return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
  }),

  humanDate: Ember.computed('date', function() {
    const monthsDict = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

    const dateArr = this.nw.split('-');

    return `${dateArr[2]} ${monthsDict[dateArr[1]]}`;
  }),
});
