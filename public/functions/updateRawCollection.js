const calcCollectionDiff = require("./calculateCollectionDifference");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const settings = require("electron-settings");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  // Check if new cards need to be added to the set
  const storedRawData = settings.get("rawData.cards");
  let diff;
  if (!storedRawData) {
    diff = ["update"];
  } else {
    diff = calcCollectionDiff(storedRawData, playerMainCollection);
  }
  console.log(diff);

  if (diff.length > 0) {
    settings.set("rawData.cards", playerMainCollection);
    parseCards(playerMainCollection);
  } else {
    return "No Cards to Update";
  }
};
