import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | game-player', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders for person', async function(assert) {
    const player = {
      name: 'Dom',
      height: 180,
      mass: 80,
      gender: 'male'
    }

    this.set('player', player);
    this.set('gameType', 'person');

    await render(hbs`<GamePlayer
      @player={{this.player}}
      @gameType={{this.gameType}}
      data-test-game-player
    />`);

    const gamePlayer = this.element.querySelector('[data-test-game-player]');
    const personStrength = gamePlayer.querySelector('[data-test-game-player-person-strength]');

    assert.equal(personStrength.textContent.trim(), '80', 'it should have the correct mass');
    assert.dom(personStrength).hasClass('is-important', 'it should have is-important class');
  });

  test('it renders for starship', async function(assert) {
    const player = {
      name: 'Dom',
      crew: 2323,
      passengers: 232323,
      length: 23
    }

    this.set('player', player);
    this.set('gameType', 'starship');

    await render(hbs`<GamePlayer
      @player={{this.player}}
      @gameType={{this.gameType}}
      data-test-game-player
    />`);

    const gamePlayer = this.element.querySelector('[data-test-game-player]');
    const starshipStrength = gamePlayer.querySelector('[data-test-game-player-starship-strength]');

    assert.equal(starshipStrength.textContent.trim(), '2323', 'it should have the correct crew number');
    assert.dom(starshipStrength).hasClass('is-important', 'it should have is-important class');
  });
});
