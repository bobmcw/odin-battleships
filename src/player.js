import { gameBoard, } from "./gameboard.js";

export class player{
    constructor(){
        this.gameboard = new gameBoard
    }
    getBoard(){
        return this.gameboard.getBoard()
    }
}
export class AI extends player{
    constructor(){
        super()
    }
}