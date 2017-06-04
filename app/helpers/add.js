import Ember from 'ember';

export function add(params/*, hash*/) {
  return params.reduce((acc, cur) => acc + cur);
}

export default Ember.Helper.helper(add);
