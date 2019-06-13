const calculateCountDiff = require("../main/functions/calculateCountDiff");

describe("Check that all differences from the last time the app was used are calculated properly", () => {
  const playerMainCollection = [
    { arena_id: "66221", quantity: 1 },
    { arena_id: "66223", quantity: 1 },
    { arena_id: "66225", quantity: 4 },
    { arena_id: "11111", quantity: 2 }
  ];
  const storedRawData = [
    { arena_id: "66221", quantity: 1 },
    { arena_id: "66223", quantity: 1 },
    { arena_id: "66225", quantity: 1 }
  ];
  it("Should return an array", () => {
    expect(calculateCountDiff(storedRawData, playerMainCollection)).toEqual(
      expect.any(Array)
    );
  });

  it("Should return only the elements that are different", () => {
    expect(calculateCountDiff(storedRawData, playerMainCollection)).toEqual(
      expect.arrayContaining([
        { arena_id: "66225", quantity: 4 },
        { arena_id: "11111", quantity: 2 }
      ])
    );
  });

  it("Should not return elements that haven't changed since last time", () => {
    expect(calculateCountDiff(storedRawData, playerMainCollection)).toEqual(
      expect.not.arrayContaining([
        { arena_id: "66225", quantity: 4 },
        { arena_id: "11111", quantity: 2 },
        { arena_id: "66225", quantity: 1 }
      ])
    );
  });

  it("Should return an array shorter than the passed in arguments", () => {
    const lenOfStoredCards = storedRawData.length;
    expect(
      calculateCountDiff(storedRawData, playerMainCollection).length
    ).toBeLessThanOrEqual(lenOfStoredCards);
  });
});
