import { gameBoard } from "../src/gameboard";

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