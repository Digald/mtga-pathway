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

  const pullOutPlayerCollectionData = settings
    .get("mtgaCardData.allMtgArenaCards")
    .map(card => {
      console.log("new card");
      const returnCard = playerMainCollection.forEach(mycard => {
        if (card.arena_id == mycard.arena_id) {
          return true;
        }
      });
      if (returnCard) {
        return card;
      }
    });

};
