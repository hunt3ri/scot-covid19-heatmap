import { getDate } from "./covid"

test('adds 1 week to start date', () => {
  expect(getDate(1)).toBe("16-Mar-2020");
});