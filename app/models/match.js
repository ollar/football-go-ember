import DS from 'ember-data';

export default DS.Model.extend({
  UTCdate: DS.attr('date'),
  date: DS.attr('string'),
  players: DS.hasMany('player'),
});
