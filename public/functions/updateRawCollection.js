const calculateIdDiff = require("./calculateIdDifference");
const calculateCountDiff = require("./calculateCountDifference");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const settings = require("electron-settings");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  // Check if new cards need to be added to the set
  const storedRawData = settings.get("rawData.cards");
  let diff = [];
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
  } else {
    console.log(storedRawData.length);
    console.log(playerMainCollection.length);
    const diff1 = calculateIdDiff(storedRawData, playerMainCollection);
    const diff2 = calculateCountDiff(storedRawData, playerMainCollection);
    diff = [...diff1, ...diff2];
  }

  console.log(diff);

  if (diff.length > 0) {
    const newRawData = settings.get("rawData.cards").push(diff);
    settings.set("rawData.cards", newRawData);
    parseCards(settings.get("rawData.cards"));
  } else {
    return "No Cards to Update";
  }
};
