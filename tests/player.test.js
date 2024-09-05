import { player } from "../src/player";

let testPlayer
describe("creating a player",()=>{
    testPlayer = new player
})
test("new players gameboard is empty",()=>{
    expect(testPlayer.getBoard()).toStrictEqual(Array(64))
})