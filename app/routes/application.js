import Route from '@ember/routing/route';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const fetchRandomPerson = () => {
  return fetch(`https://swapi.dev/api/people/${getRandomInt(1, 10)}`).then((response) => response.json());
}

const fetchRandomStarship = () => {
  return fetch(`https://swapi.dev/api/starships/${getRandomInt(9, 13)}`).then((response) => response.json());
}

export default class ApplicationRoute extends Route {
  setupController(controller) {
    controller.set('playerOneScore', 0);
    controller.set('playerTwoScore', 0);
    controller.set('fetchRandomPerson', fetchRandomPerson);
    controller.set('fetchRandomStarship', fetchRandomStarship);
  }
}
