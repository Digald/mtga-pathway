const extractNewCardQuantity = require("../main/functions/extractNewCardQuantity");

describe("Check that only new cards are properly returned", () => {
  const allDifferences = [
    { arena_id: "66225", quantity: 4 },
    { arena_id: "66232", quantity: 2 },
    { arena_id: "11111", quantity: 2 },
    { arena_id: "11112", quantity: 1 },
    { arena_id: "11113", quantity: 2 }
  ];
  const onlyNewCards = [
    { arena_id: "11111", quantity: 2 },
    { arena_id: "11112", quantity: 1 },
    { arena_id: "11113", quantity: 2 }
  ];

  it("Should return an array", () => {
    expect(extractNewCardQuantity(allDifferences, onlyNewCards)).toEqual(
      expect.any(Array)
    );
  });

  it("Should return cards that already exist but have new quantities", () => {
    expect(extractNewCardQuantity(allDifferences, onlyNewCards)).toEqual([
      { arena_id: "66225", quantity: 4 },
      { arena_id: "66232", quantity: 2 }
    ]);
  });

  it("Should NOT return cards that are new or don't have updated quantities", () => {
    expect(extractNewCardQuantity(allDifferences, onlyNewCards)).toEqual(
      expect.not.arrayContaining([
        { arena_id: "11111", quantity: 2 },
        { arena_id: "11112", quantity: 1 },
        { arena_id: "11113", quantity: 2 }
      ])
    );
  });
});
