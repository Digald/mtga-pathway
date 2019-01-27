const calcCollectionDiff = require("./calculateCollectionDifference");
const packageCollection = require("./packageCollection");
const parseCards = require('./parseCards');
const settings = require("electron-settings");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  // Check if new cards need to be added to the set
  const diff = calcCollectionDiff(
    settings.get("rawData.cards"),
    playerMainCollection
  );

  if (diff.length > 0) {
    settings.set("rawData.cards", playerMainCollection);
  }


};
