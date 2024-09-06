import {player} from './player.js'
import './style.css'

class DOMMethods{
    drawBoard(player){
        const boardContainer = document.querySelector('.board')
        boardContainer.innerHTML = ""
        console.log(player.getBoard())
        player.getBoard().forEach(space => {
            const tile = document.createElement('div')
            tile.classList.add('tile')
            boardContainer.appendChild(tile)
        });
    }
}
const testPlayer = new player
const DOMTools = new DOMMethods
DOMTools.drawBoard(testPlayer)