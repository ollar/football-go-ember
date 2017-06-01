import Ember from 'ember';

export default Ember.Route.extend({
  players: [],
  nextWednesday: Ember.inject.service(),
  // nextWednesday() {
  //   const todayDay = new Date().getDay();
  //   const today = new Date();
  //
  //   const dayDelta = () => {
  //     if (todayDay < 4) return 3 - todayDay;
  //     return 10 - todayDay;
  //   };
  //
  //   return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDelta());
  // },
  //
  // formatDate(date) {
  //   const dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  //
  //   return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
  // },

  model() {
    var date = 'aa';

    console.log(this.nextWednesday.serverDate);

    return this.get('store').findRecord('match', date)
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
