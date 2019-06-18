const scrapeDeckList = require("../main/functions/scrapeDeckList");
jest.setTimeout(10000);
describe("Confirm that deck list is properly added from deck metadata", () => {
  const singleDeck = {
    name: "Bant Explore",
    colors: ["w", "u", "b", "g"],
    url: "https://www.mtggoldfish.com/archetype/standard-bant-explore#arena"
  };

  it("Should return an array", async () => {
    expect(await scrapeDeckList(singleDeck)).toEqual(expect.any(Array));
  });
});
