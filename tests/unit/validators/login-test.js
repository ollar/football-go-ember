import { module, test } from 'qunit';
import validateLogin from 'football-go-ember/validators/login';

module('Unit | Validator | login');

test('it exists', function(assert) {
  assert.ok(validateLogin());
});
