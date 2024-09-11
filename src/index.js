import { player } from "./player.js";
import "./style.css";

const circle =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
const cross =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = player1;
    this.boardTemplate = document.querySelector(".board").innerHTML;
    this.spacesAlreadyShotForPlayer1 = [];
    this.spacesAlreadyShotForPlayer2 = [];
  }
  drawBoard(player) {
    let spacesAlreadyShot;
    this.activePlayer === this.player1
      ? (spacesAlreadyShot = this.spacesAlreadyShotForPlayer1)
      : (spacesAlreadyShot = this.spacesAlreadyShotForPlayer2);
    let boardContainer = document.querySelector(".board");
    boardContainer.innerHTML = this.boardTemplate;
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
      let cord = "";
      cord += dict[tile.value % 8];
      cord += Math.trunc(tile.value / 8) + 1;
      if (spacesAlreadyShot.includes(cord)) {
        if (this.activePlayer.gameboard.getAt(cord) !== undefined) {
          tile.innerHTML = cross;
        } else {
          tile.innerHTML = circle;
        }
      }

      tile.addEventListener("click", () => {
        if (!spacesAlreadyShot.includes(cord)) {
          tile.innerHTML = circle;
          if (this.activePlayer.gameboard.reciveAttack(cord)) {
            console.log("hit");
          spacesAlreadyShot.push(cord);
            tile.innerHTML = cross;
            if (this.activePlayer.gameboard.getAt(cord).isSunk()) {
              console.log("sunk");
              if (this.activePlayer.gameboard.areAllShipsSunken()) {
                alert(`${this.activePlayer.name} won!`);
              }
            }
          }
          else{
          spacesAlreadyShot.push(cord);
          setTimeout(() => {  
          this.switchPlayer();
          boardContainer = this.boardTemplate;
          this.drawBoard(this.activePlayer);
          }, 1000);
          }
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
      const header = document.querySelector('.header')
      header.innerText = `${this.activePlayer.name}'s board`
  }
  startGame() {}
  placeShips() {}
  turn() {}
}
const player1 = new player("player1");
player1.placeShip(["a1", "a2", "a3"]);
const player2 = new player("player2");
const game = new GameController(player1, player2);
const pvp = document.querySelector('#pvp')
pvp.addEventListener('click',()=>{
game.drawBoard(player1);
})
