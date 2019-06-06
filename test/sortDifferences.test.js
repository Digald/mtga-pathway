const sortDifferences = require("../main/functions/sortDifferences");

describe("Check that only new cards are properly returned", () => {
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
    expect(sortDifferences(storedRawData, playerMainCollection)).toEqual(
      expect.any(Array)
    );
  });

  it("Should return cards that are brand new", () => {
    expect(sortDifferences(storedRawData, playerMainCollection)).toEqual(
      expect.arrayContaining([{ arena_id: "11111", quantity: 2 }])
    );
  });

  it("Should return cards that are brand new", () => {
    expect(sortDifferences(storedRawData, playerMainCollection)).toEqual(
      expect.not.arrayContaining([{ arena_id: "66225", quantity: 4 }])
    );
  });
});
