import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action
  startGame(type) {
    const promises = type === 'person' ?
      [this.fetchRandomPerson(), this.fetchRandomPerson()] :
      [this.fetchRandomStarship(), this.fetchRandomStarship()]
    Promise.all(promises)
      .then((data) => {
        const playerOne = data[0];
        const playerTwo = data[1];

        const playerOneStrength = parseInt(playerOne[type === 'person' ? 'mass' : 'crew']) || 0;
        const playerTwoStrength = parseInt(playerTwo[type === 'person' ? 'mass' : 'crew']) || 0;

        if (this.gameType !== type) {
          this.resetScore();
        }

        if (playerOneStrength > playerTwoStrength) {
          this.set('playerOneScore', this.playerOneScore + 1);
          this.set('lastWonRound', "1");
        } else if (playerOneStrength < playerTwoStrength) {
          this.set('playerTwoScore', this.playerTwoScore + 1);
          this.set('lastWonRound', "2");
        } else {
          this.set('lastWonRound', "0");
        }

        this.set('gameType', type);
        this.set('playerOne', playerOne);
        this.set('playerTwo', playerTwo);
      })
  }

  resetScore() {
    this.set('playerOneScore', 0);
    this.set('playerTwoScore', 0);
  }
}
