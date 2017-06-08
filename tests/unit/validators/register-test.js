import { module, test } from 'qunit';
import validateRegister from 'football-go-ember/validators/register';

module('Unit | Validator | register');

test('it exists', function(assert) {
  assert.ok(validateRegister());
});
