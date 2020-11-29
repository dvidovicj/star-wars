import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | game-area', function(hooks) {
  setupRenderingTest(hooks);

  test('it plays the game', async function(assert) {
    const startGame = (type) => {
      const playerOne = {
        name: 'Neo',
        height: 180,
        mass: 180,
        gender: 'male'
      };

      const playerTwo = {
        name: 'Reo',
        height: 110,
        mass: 110,
        gender: 'male'
      };

      this.set('gameType', type);
      this.set('lastWonRound', "1");
      this.set('playerOneScore', 1);
      this.set('playerTwoScore', 0);
      this.set('playerOne', playerOne);
      this.set('playerTwo', playerTwo);
    };

    this.set('startGame', startGame);

    await render(hbs`<GameArea
      @gameType={{this.gameType}}
      @playerOne={{this.playerOne}}
      @playerTwo={{this.playerTwo}}
      @lastWonRound={{this.lastWonRound}}
      @playerOneScore={{this.playerOneScore}}
      @playerTwoScore={{this.playerTwoScore}}
      @startGame={{this.startGame}}
      data-test-game-area=""
    />`);

    const gameArea = this.element.querySelector('[data-test-game-area]');
    const gameAreaField = gameArea.querySelector('[data-test-game-area-field]');
    
    assert.equal(gameAreaField.textContent.trim(), 'Battle\'s gonna start soon!', 'it should show the initial state text');
    
    const startGameButton = gameArea.querySelector('[data-test-game-area-start-game-person-button]');

    await click(startGameButton);

    const playerOneScore = gameArea.querySelector('[data-test-game-area-player-one-score]');
    const playerTwoScore = gameArea.querySelector('[data-test-game-area-player-two-score]');
    const playerOneEmoji = gameArea.querySelector('[data-test-game-area-player-one-emoji]');

    assert.equal(playerOneScore.textContent.trim(), '1', 'it should show number 1 for score');
    assert.equal(playerOneEmoji.textContent.trim(), '🎉', 'it should show 🎉 for player one');
    assert.equal(playerTwoScore.textContent.trim(), '0', 'it should show number 0 for score');
  });
});
