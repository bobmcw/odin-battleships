import { gameBoard } from "../src/gameboard";
import { ship } from "../src/ship";

let board
describe("creating a gameboard",()=>{
    board = new gameBoard
})

test("translating simple coordinate",()=>{
    expect(board.translateCoordinates('a1')).toBe(0)
})
test("coordinate from a different file",()=>{
    expect(board.translateCoordinates('b1')).toBe(1)
})
test("different row",()=>{
    expect(board.translateCoordinates('a2')).toBe(8)
})
test("last space",()=>{
    expect(board.translateCoordinates('h8')).toBe(63)
})
test("middle file and row",()=>{
    expect(board.translateCoordinates('c5')).toBe(34)
})
test("file out of range",()=>{
    expect(() => board.translateCoordinates('m2')).toThrow()
})
test("row out of range",()=>{
    expect(() => board.translateCoordinates('a9')).toThrow()
})
test("invalid coordinate format",()=>{
    expect(() => board.translateCoordinates('abc2')).toThrow()
})
test("board should always have 64 spaces",()=>{
    expect(board.getBoard().length).toBe(64)
})
test("placing a ship",()=>{
    board.placeShip(['a1','a2'])
    expect(board.getAt('a1') === board.getAt('a2')).toBe(true)
})
test("placing too long of a ship",()=>{
    expect(()=> board.placeShip(['b1','b2','b3','b4','b5'])).toThrow()
})
test("repeating coordinates when placing",()=>{
    expect(()=> board.placeShip(['b1','b1','bs1','b2','b3'])).toThrow()
})
test("ships parts should be connected",()=>{
    expect(()=> board.placeShip(['d1','e4','b3'])).toThrow()
})
test("ship can't be a square",()=>{
    expect(()=> board.placeShip(['d5','d6','e5','e6'])).toThrow()
})
test("empty array",()=>{
    expect(()=> board.placeShip([])).toThrow()
})
test("placing an L spahed ship",()=>{
    expect(() => board.placeShip(['d4','d5','d6','e6'])).not.toThrow()
})
test("hitting a ship",()=>{
    expect(board.reciveAttack('a1')).toBe(true)
})
test("can't attack same space twice",()=>{
    expect(()=> board.reciveAttack('a1')).toThrow()
})
test("sinking a ship",()=>{
    board.reciveAttack('a2')
    expect(board.getAt('a1').isSunk()).toBe(true)
})