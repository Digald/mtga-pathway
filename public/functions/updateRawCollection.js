const calculateIdDiff = require("./calculateIdDifference");
const calculateCountDiff = require("./calculateCountDifference");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const settings = require("electron-settings");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  const storedRawData = settings.get("rawData.cards");

  // Check if there are any differences in cards from last time the app was used
  let diff = [];
  if (!storedRawData) {
    // If there is no saved data found
    settings.set("rawData.cards", playerMainCollection);
    diff = ["first-time"];
  } else {
    // If there is already data saved, check if it needs to be udpated. Find the differences and combine them
    console.log(storedRawData.length);
    console.log(playerMainCollection.length);
    // CREATES DUPLICATE ELEMENTS IF IT'S A NEW ITEM AND THE COUNT HAS CHANGED
    const diff1 = calculateIdDiff(storedRawData, playerMainCollection);
    const diff2 = calculateCountDiff(storedRawData, playerMainCollection);
    diff = [...diff1, ...diff2];
  }

  console.log(diff);

  if (diff.length > 0) {
    if (diff[0] === "first-time") {
      parseCards(playerMainCollection);
    } else {
      const newRawData = settings.get("rawData.cards").push(diff);
      console.log(typeof newRawData)
      settings.set("rawData.cards", newRawData);
      console.log(typeof settings.get('rawData.cards'));
      parseCards(settings.get("rawData.cards"));
    }
  } else {
    return "No Cards to Update";
  }
};
