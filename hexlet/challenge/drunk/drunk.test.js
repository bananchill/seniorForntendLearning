import Drunkard from './solution/drunk.js';
import { describe, expect, test } from "@jest/globals";

const generateArray = (length, value) => Array.from({ length }, () => value);

const rounds = [
  [[1], [2], 'Second player. Round: 1'],
  [[2], [1], 'First player. Round: 1'],
  [[1], [1], 'Botva!'],
  [[1, 2], [3, 2], 'Second player. Round: 2'],
  [[1, 3], [2, 1], 'First player. Round: 4'],
  [generateArray(100, 1), generateArray(100, 1), 'Botva!'],
  [[3, 1], [1, 3], 'Botva!'],
];

describe('Game', () => {
  const game = new Drunkard();
  test.each(rounds)('round %#\ngamer1: %p\ngamer2: %p', (cards1, cards2, message) => {
    expect(game.run(cards1, cards2)).toEqual(message);
  });
});
