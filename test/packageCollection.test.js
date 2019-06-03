const packageCollection = require("../main/functions/packageCollection");

describe("Reorganize scraped data without losing or modifying it", () => {
  const playerCards = { "11111": 1, "11112": 3, "11113": 4, "11114": 2 };
  it("Should return an array", () => {
    expect(packageCollection(playerCards)).toEqual(expect.any(Array));
  });

  it("Should return an element that has arena_ids and quantities", () => {
    expect(packageCollection(playerCards)).toEqual(
      expect.arrayContaining([
        {
          arena_id: "11113",
          quantity: 4
        }
      ])
    );
  });

  it("Should return an array of the same length", () => {
    const sizeOfInput = Object.keys(playerCards).length;
    expect(packageCollection(playerCards).length).toEqual(sizeOfInput);
  });
});
