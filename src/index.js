import { AI, player } from "./player.js";
import { ship } from "./ship.js";
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
    this.setupDone = false;
  }
  drawBoard(player, isForPlacing = false) {
    let disableShoting = false
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
      if (!isForPlacing) {
        tile.addEventListener("click", () => {
          if(this.activePlayer === this.player1 && this.player2.name === "AI"){disableShoting = true}
          if (!spacesAlreadyShot.includes(cord) && !disableShoting) {
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
            } else {
                disableShoting = true
              spacesAlreadyShot.push(cord);
              setTimeout(() => {
                this.switchPlayer();
                boardContainer = this.boardTemplate;
                this.drawBoard(this.activePlayer);
              }, 1000);
            }
          }
        });
      }
      boardContainer.appendChild(tile);
    });
  }
  AIturn(){
    const space = this.player2.shootRandomSpace()
    const spaceCoord = this.translateCoordinate(space)
    this.activePlayer.gameboard.reciveAttack(spaceCoord)
    console.log(this.activePlayer)
    console.log(this.activePlayer.gameboard)
    setTimeout(() => {
     this.switchPlayer() 
     this.drawBoard(this.activePlayer)
    }, 2000);
  }
  switchPlayer() {
    //active player means which player's board is currently being displayed and therefore attacked.
    this.activePlayer === this.player1
      ? (this.activePlayer = this.player2)
      : (this.activePlayer = this.player1);
    const header = document.querySelector(".header");
    header.innerText = `${this.activePlayer.name}'s board`;
    if(this.activePlayer.name !== "AI" && this.player2.name === "AI"){
      this.AIturn()
    }
  }
  translateCoordinate(number) {
    const dict = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let cord = "";
    cord += dict[number % 8];
    cord += Math.trunc(number / 8) + 1;
    return cord;
  }
  startGame() {}
  placeShip(player, shipQueue = [4, 3, 3, 2], invalidTiles = []) {
    if (shipQueue.length === 0) {
        if(this.player2.name === "AI"){
          this.switchPlayer()
            this.drawBoard(this.activePlayer)
            return
        }
      if (!this.setupDone) {
        this.switchPlayer();
        this.placeShip(this.player2);
        this.setupDone = true;
      } else {
        this.switchPlayer();
        this.drawBoard(this.player1);
      }
      return;
    }
    //create a draggable ship
    this.drawBoard(player, true);
    const container = document.querySelector(".container");
    const shipToPlace = document.createElement("div");
    shipToPlace.classList.add("ship");
    shipToPlace.setAttribute("draggable", true);
    for (let i = 0; i < shipQueue[0]; i++) {
      const shipPart = document.createElement("div");
      shipPart.classList.add("shipPart");
      shipToPlace.appendChild(shipPart);
    }
    const rotateButton = document.createElement("button");
    rotateButton.innerText = "rotate";
    //these are to prevent hitboxes spanning too many lanes / files
    let hitboxFactorX = 0.85;
    let hitboxFactorY = 0.01;
    rotateButton.addEventListener("click", () => {
      let currentOrientation = window
        .getComputedStyle(shipToPlace)
        .getPropertyValue("flex-direction");
      console.log(currentOrientation);
      if (currentOrientation === "row") {
        shipToPlace.style.flexDirection = "column";
        hitboxFactorX = 0.01;
        hitboxFactorY = 0.85;
      } else {
        shipToPlace.style.flexDirection = "row";
        hitboxFactorX = 0.85;
        hitboxFactorY = 0.01;
      }
    });
    container.appendChild(rotateButton);
    const tiles = document.querySelectorAll(".tile");
    //mark tiles already containing a ship

    tiles.forEach((tile) => {
      if (
        player.gameboard.getAt(this.translateCoordinate(tile.value)) !==
        undefined
      ) {
        tile.classList.add("placedShip");
      }
    });

    function CalculateInvalid(nums) {
      const result = [...nums];
      nums.forEach((element) => {
        result.push(element + 8);
        result.push(element - 8);
      });
      //check if ship is on the left edge
      if (nums[0] % 8 !== 0) {
        result.push(nums[0] - 1);
      }
      //check if ship is on the right edge
      if (nums[nums.length - 1] % 8 !== 7) {
        result.push(nums[nums.length - 1] + 1);
      }
      return result;
    }

    //handle droping on tiles
    tiles.forEach((tile) => {
      tile.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      tile.addEventListener("drop", (e) => {
        e.preventDefault();
        const selected = document.querySelectorAll(".dragedOver");
        const selectedTiles = [];
        const selectedNumbers = [];
        let validPosition = true;
        selected.forEach((tile) => {
          if (invalidTiles.includes(tile.value)) {
            validPosition = false;
          }
        });
        if (selected.length === shipQueue[0] && validPosition) {
          shipToPlace.innerHTML = "";
          selected.forEach((element) => {
            selectedNumbers.push(element.value);
            element.classList.add("placedShip");
            selectedTiles.push(this.translateCoordinate(element.value));
          });
          const newInvalid = CalculateInvalid(selectedNumbers);
          invalidTiles = invalidTiles.concat(newInvalid);
          player.placeShip(selectedTiles);
          shipQueue.shift();
          rotateButton.remove();
          this.placeShip(player, shipQueue, invalidTiles);
        } else {
          selected.forEach((element) => {
            element.classList.remove("dragedOver");
          });
        }
      });
    });

    //detecting when dragging over a tile
    let offsetX = 0;
    let offsetY = 0;
    let shipDimentions;
    shipToPlace.addEventListener("dragstart", (e) => {
      shipDimentions = shipToPlace.getBoundingClientRect();
      offsetX = e.clientX - shipDimentions.left;
      offsetY = e.clientY - shipDimentions.top;
    });
    shipToPlace.addEventListener("drag", (e) => {
      e.preventDefault();
      const dragHitbox = {
        left: e.clientX - offsetX,
        right: e.clientX - offsetX + shipToPlace.offsetWidth * hitboxFactorX,
        top: e.clientY - offsetY,
        bottom: e.clientY - offsetY + shipToPlace.offsetHeight * hitboxFactorY,
      };
      tiles.forEach((tile) => {
        const tileDimension = tile.getBoundingClientRect();
        if (
          dragHitbox.left < tileDimension.right - 4 &&
          dragHitbox.right > tileDimension.left &&
          dragHitbox.top < tileDimension.bottom - 5 &&
          dragHitbox.bottom > tileDimension.top
        ) {
          tile.classList.add("dragedOver");
        } else {
          tile.classList.remove("dragedOver");
        }
      });
    });
    container.appendChild(shipToPlace);
  }
  Setup() {
    this.placeShip(this.activePlayer);
  }
}
const player1 = new player("player1");
const player2 = new player("player2");
const pvp = document.querySelector("#pvp");
const title = document.querySelector(".titleScreen");
pvp.addEventListener("click", () => {
const game = new GameController(player1, player2);
  game.placeShip(game.player1);
  title.remove();
});
const pve = document.querySelector('#pve')
pve.addEventListener("click",()=>{
    const bot = new AI("AI")
    const game = new GameController(player1,bot)
    game.placeShip(game.player1)
    title.remove()
    bot.gameboard.placeShip(bot.generateRandomShip(4))
    bot.gameboard.placeShip(bot.generateRandomShip(3))
    bot.gameboard.placeShip(bot.generateRandomShip(3))
    bot.gameboard.placeShip(bot.generateRandomShip(2))
})