import { gameBoard } from "./gameboard.js";

export class player {
  constructor(name) {
    this.gameboard = new gameBoard();
    this.name = name
  }
  getBoard() {
    return this.gameboard.getBoard();
  }
  placeShip(coordinatArr) {
    this.gameboard.placeShip(coordinatArr);
  }
}
export class AI extends player {
  constructor(name) {
    super(name);
  }
  
}
