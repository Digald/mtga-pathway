const packageCollection = require("./packageCollection");
const settings = require("electron-settings");

// Import json data
const dom = require("../data/dom.json");
const grn = require("../data/grn.json");
const m19 = require("../data/m19.json");
const otherArenaSets = require("../data/otherArenaSets.json");
const rix = require("../data/rix.json");
const rna = require("../data/rna.json");
const xln = require("../data/xln.json");

module.exports = async function(playerCards) {
  const playerMainCollection = packageCollection(playerCards);

  // Combine all json data into a single array and store it locally
  const allMtgArenaCards = [
    ...xln,
    ...rna,
    ...rix,
    ...m19,
    ...grn,
    ...dom,
    ...otherArenaSets
  ];

  settings.set("mtgaCardData", {
    allMtgArenaCards
  });

  const pullOutPlayerCollectionData = playerMainCollection.map(card => {
    const allCards = settings.get("mtgaCardData.allMtgArenaCards");
    let singleCardData = allCards.filter(
      data => data.arena_id == card.arena_id
    );
    singleCardData[0].count = card.count;
    return singleCardData[0];
  });

  console.log(pullOutPlayerCollectionData);
};
