import { player } from "./player.js";
import "./style.css";

class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = player1;
    this.boardTemplate = document.querySelector(".board");
    this.spacesAlreadyShot = [];
  }
  drawBoard(player) {
    let boardContainer = document.querySelector(".board");
    boardContainer = this.boardTemplate;
    let coordinate = 0;
    let rowNum = 1;
    player.getBoard().forEach((space) => {
      const dict = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const tile = document.createElement("div");
      //adding a row number to the board
      if (coordinate % 8 === 0) {
        const row = document.createElement("h1");
        row.innerText = rowNum;
        row.classList.add("num");
        rowNum += 1;
        boardContainer.appendChild(row);
      }
      tile.value = coordinate;
      coordinate += 1;
      tile.classList.add("tile");
      tile.innerText = space;
      tile.addEventListener("click", () => {
        let cord = "";
        cord += dict[tile.value % 8];
        cord += Math.trunc(tile.value / 8) + 1;
        if (!this.spacesAlreadyShot.includes(cord)) {
          tile.classList.add("shot");
          if(this.activePlayer.gameboard.reciveAttack(cord)){
            console.log('hit')
          }
          if(this.activePlayer.gameboard.getAt(cord).isSunk()){
            console.log("sunk")
          }
          this.spacesAlreadyShot.push(cord);
        }
      });
      boardContainer.appendChild(tile);
    });
  }
  switchPlayer() {
    //active player means which player's board is currently being displayed and therefor attacked.
    this.activePlayer === this.player1
      ? (this.activePlayer = this.player2)
      : (this.activePlayer = this.player1);
  }
  startGame() {}
  placeShips() {}
  turn() {}
}
const player1 = new player();
player1.placeShip(["a1", "a2", "a3"]);
const player2 = new player();
const game = new GameController(player1, player2);
game.drawBoard(player1);
