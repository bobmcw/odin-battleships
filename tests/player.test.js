import { player } from "../src/player.js";

let testPlayer
describe("creating a player",()=>{
    testPlayer = new player
})
test("new players gameboard is empty",()=>{
    expect(testPlayer.getBoard()).toStrictEqual(Array.apply(null,Array(64)))
})