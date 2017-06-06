import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ball-spinner', 'Integration | Component | ball spinner', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ball-spinner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ball-spinner}}
      template block text
    {{/ball-spinner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
