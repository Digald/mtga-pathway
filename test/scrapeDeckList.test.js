const scrapeDeckList = require("../main/functions/scrapeDeckList");
jest.setTimeout(10000);

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false
      };
    }
  }
});
describe("Confirm that deck list is properly added from deck metadata", () => {
  const singleDeck = {
    name: "Bant Explore",
    colors: ["w", "u", "b", "g"],
    url: "https://www.mtggoldfish.com/archetype/standard-bant-explore#arena"
  };

  // it("Should return an array", async () => {
  //   expect(await scrapeDeckList(singleDeck)).toEqual(expect.any(Array));
  // });

  // it("Should contain an object in each index", async () => {
  //   expect(await scrapeDeckList(singleDeck)).toEqual(expect.any(Object));
  // });

  it("Should contain certain properties in each object", async () => {
    expect(await scrapeDeckList(singleDeck)).toContainObject({
      name: expect.any(String);
      // name: expect.any(String),
      // quantity: expect.any(String),
      // image: expect.any(String),
      // mana_cost: expect.any(Array),
      // rarity: expect.any(String),
      // type: expect.any(String)
    });
  });
});
