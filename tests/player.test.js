import { AI, player } from "../src/player.js";

let testPlayer
let testAI
describe("creating a player",()=>{
    testPlayer = new player
    testAI = new AI
})
test("new players gameboard is empty",()=>{
    expect(testPlayer.getBoard()).toStrictEqual(Array.apply(null,Array(64)))
})
test("AI attacks each space exactly once",()=>{
    const spacesShot = []
    for(let i=0;i<64;i++){
        spacesShot.push(testAI.shootRandomSpace())
    }
    const validArr = []
    for(let i=0;i<64;i++){
        validArr.push(i)
    }
    spacesShot.sort((a,b)=> a-b)
    validArr.sort((a,b)=> a-b)
    console.log(spacesShot)
    expect(spacesShot).toStrictEqual(validArr)
})