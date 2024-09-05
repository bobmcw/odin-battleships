import { ship } from "../src/ship.js";

let oneLengthShip;
let twoLengthShip;
let threeLengthShip;
let fourlengthShip;

describe("create ships", () => {
  oneLengthShip = new ship(1);
  twoLengthShip = new ship(2);
  threeLengthShip = new ship(3);
  fourlengthShip = new ship(4);
});

beforeEach(() => {
  oneLengthShip = new ship(1);
  twoLengthShip = new ship(2);
  threeLengthShip = new ship(3);
  fourlengthShip = new ship(4);
});

test("ship sinking", () => {
  oneLengthShip.hit();
  expect(oneLengthShip.isSunk()).toBe(true);
});
test("ship not sinking after one hit if longer than one", () => {
  twoLengthShip.hit();
  expect(twoLengthShip.isSunk()).toBe(false);
});
test("new ship is not sunk", () => {
  expect(oneLengthShip.isSunk()).toBe(false);
});
test("ship over max length", () => {
  expect(() => {
    const illegalShip = new ship(5);
  }).toThrow();
});
test("ship with floaring point length", () => {
  expect(() => {
    const illegalShip = new ship(2.5);
  }).toThrow();
});
