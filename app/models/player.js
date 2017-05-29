import DS from 'ember-data';

export default DS.Model.extend({
  playersName: DS.attr('string'),
  flag: DS.attr('string')
});
