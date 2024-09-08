import {player} from './player.js'
import './style.css'

class DOMMethods{
    constructor(player1,player2){
        this.player1 = player1
        this.player2 = player2
        this.activePlayer = player1
    }
    drawBoard(player){
        const boardContainer = document.querySelector('.board')
        boardContainer.innerHTML = ""
        console.log(player.getBoard())
        player.getBoard().forEach(space => {
            const tile = document.createElement('div')
            tile.classList.add('tile')
            tile.innerText = space
            boardContainer.appendChild(tile)
        });
    }
    switchPlayer(){
        this.activePlayer === this.player1 ? this.activePlayer = this.player2 : this.activePlayer = this.player1
    }
}
const player1 = new player
player1.placeShip(['a1','a2','a3'])
const player2 = new player
const DOMTools = new DOMMethods
DOMTools.drawBoard(player1)