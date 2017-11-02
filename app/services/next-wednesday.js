import Ember from 'ember';
import wednesdayUtil from '../utils/next-wednesday';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.nw = wednesdayUtil();
  },

  i18n: Ember.inject.service(),

  serverDate: Ember.computed('date', function() {
    const dateArr = [
      this.nw.getFullYear(),
      this.nw.getMonth() + 1,
      this.nw.getDate()
    ];

    return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
  }),

  humanDate: Ember.computed('serverDate', function() {
    console.log(this.get('i18n'))
    let locale = 'en';

    const monthsDict = {
      en: {
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
      },
      ru: {
        1: 'Января',
        2: 'Февраля',
        3: 'Марта',
        4: 'Апреля',
        5: 'Мая',
        6: 'Июня',
        7: 'Июля',
        8: 'Августа',
        9: 'Сентября',
        10: 'Октября',
        11: 'Ноября',
        12: 'Декабря',
      },
    };

    if (monthsDict[this.get('i18n.locale')]) {
      locale = this.get('i18n.locale');
    }

    const dateArr = this.get('serverDate').split('-');

    return `${dateArr[2]} ${monthsDict[locale][dateArr[1]]}`;
  }),
});
