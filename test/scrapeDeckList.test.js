const scrapeDeckList = require("../main/functions/scrapeDeckList");

jest.setTimeout(15000);

/*Need to figure out a better way to test an http response of an array of objects
name: expect.any(String),
quantity: expect.any(String),
image: expect.any(String),
mana_cost: expect.any(Array),
rarity: expect.any(String),
type: expect.any(String)
*/
describe("Confirm that deck list is properly added from deck metadata", async () => {
  const singleDeck = {
    name: "Bant Explore",
    colors: ["w", "u", "b", "g"],
    url: "https://www.mtggoldfish.com/archetype/standard-bant-explore#arena"
  };

  it("Should return an array", async () => {
    expect(await scrapeDeckList(singleDeck)).toEqual(expect.any(Array));
  });
});
