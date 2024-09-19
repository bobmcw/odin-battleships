import { gameBoard } from "./gameboard.js";

export class player {
  constructor(name) {
    this.gameboard = new gameBoard();
    this.name = name;
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
    this.invalidSpaces = [];
    this.availableSpaces = []
    for(let i=0;i<64;i++){
      this.availableSpaces.push(i)
    }
  }
  randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  translateCoordinate(number) {
    const dict = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let cord = "";
    cord += dict[number % 8];
    cord += Math.trunc(number / 8) + 1;
    return cord;
  }
  CalculateInvalid(nums) {
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
  generateRandomShip(length) {
    const coords = [];
    const coordNums = []
    let origin = this.randomInt(64);
    let orientation = this.randomInt(2);
    if (orientation === 0) {
      //vertical
      if (origin + 8 * length > 63) {
        for (let i = 0; i < length; i++) {
          coordNums.push(origin - i * 8);
          coords.push(this.translateCoordinate(origin - i * 8));
        }
      } else {
        for (let i = 0; i < length; i++) {
          coordNums.push(origin + i * 8);
          coords.push(this.translateCoordinate(origin + i * 8));
        }
      }
    } else {
      //horizontal
      let rightEdge = origin;
      const rightEdges = [7,15,23,31,39,47,55,63]
      while (!(rightEdges.includes(rightEdge))) {
        rightEdge += 1;
      }

      if (origin + length > rightEdge) {
        for (let i = 0; i < length; i++) {
          coordNums.push(origin - i);
          coords.push(this.translateCoordinate(origin - i));
        }
      } else {
        for (let i = 0; i < length; i++) {
          coordNums.push(origin + i);
          coords.push(this.translateCoordinate(origin + i));
        }
      }
    }
    let invalid = false
    coordNums.forEach((element) => {
      if (this.invalidSpaces.includes(element)) {
        invalid = true
      }
    });
    if(invalid){
        return this.generateRandomShip(length);
    }
    else{
    const newInvalid = this.CalculateInvalid(coordNums);
    this.invalidSpaces = this.invalidSpaces.concat(newInvalid);
    return coords;
    }
  }
  shootRandomSpace(){
    const space = this.availableSpaces[this.randomInt(this.availableSpaces.length-1)]
    const index = this.availableSpaces.indexOf(space)
    this.availableSpaces.splice(index,1)
    return space
  }
}
