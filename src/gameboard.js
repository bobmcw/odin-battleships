import { sharing } from "webpack";
import { ship, } from "./ship";

export class gameBoard {
  constructor() {
    this.board = Array(64)
    this.numOfOneLengthShips = 1
    this.numOfTwoLengthShips = 1
    this.numOfThreeLengthShips = 1
    this.numOfFourLengthShips = 1
  }
  translateCoordinates(coordinate){
    const dict = {
        'a':0,
        'b':1,
        'c':2,
        'd':3,
        'e':4,
        'f':5,
        'g':6,
        'h':7
    }
    if (coordinate[1] > 8 || coordinate[1] < 1){
      throw new Error("row out of range")
    }
    if (!(coordinate[0] in dict)){
            throw new Error("file out of range")
    }
    if(coordinate.length != 2){
      throw new Error("invalid coordinate format")
    }
    return (coordinate[1]-1)*8 + dict[coordinate[0]]
  }
  placeShip(coordinateArr){
    if(!Array.isArray(coordinateArr)|| coordinateArr.length === 0){
      throw new Error("input data must be an array")
    }
    const shipToPlace = new ship(coordinateArr.length)
    const converted = []
    coordinateArr.forEach(element => {
      converted.push(this.translateCoordinates(element)) 
    });
    for(let i=1;i<=converted.length-1;i++){
      if(Math.abs(converted[i] - converted[i-1]) != 8){ 
        if(Math.abs(converted[i] - converted[i-1]) != 1){
          throw new Error("ship is not connected")
        }
      }
    }
    coordinateArr.forEach(coordinate => {
     this.board[this.translateCoordinates(coordinate)] = shipToPlace
    });
  }
  getBoard(){
    return this.board
  }
  getAt(coordinate){
    return this.getBoard[this.translateCoordinates(coordinate)]
  }

}
