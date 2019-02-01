const sortDifferences = require("./sortDifferences");
const calculateCountDiff = require("./calculateCountDifference");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const settings = require("electron-settings");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  const storedRawData = settings.get("rawData.cards");

  /**
   * Check if there are any differences in cards from last time the app was used
   */
  // Array going to contain all difference, new cards and new quantities
  let diff = [];

  // Array only going to contain new cards obtained
  let onlyNewCards = [];

  // If there is no saved data found
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
    diff = ["first-time"];
  }

  // If there is already data saved, check if it needs to be udpated. Find the differences and combine them
  else {
    // console.log(storedRawData.length);
    // console.log(playerMainCollection.length);
    diff = calculateCountDiff(storedRawData, playerMainCollection);
    onlyNewCards = sortDifferences(storedRawData, playerMainCollection);
  }
  console.log(diff);
  console.log(onlyNewCards);

  // If this is the first time running or there are new cards to parse, diff.length will be greater than 0
  if (diff.length > 0) {
    // Only run for using the app for the first time
    if (diff[0] === "first-time") {
      parseCards(playerMainCollection);
    }

    // Run else statement when new cards are found
    else {
      const newRawData = [...settings.get("rawData.cards"), ...diff];
      console.log(typeof newRawData);
      settings.set("rawData.cards", newRawData);
      console.log(typeof settings.get("rawData.cards"));
      parseCards(settings.get("rawData.cards"));
    }

    // Nothing new to update, more logic to be added
  } else {
    console.log("nothing to update");
    return "No Cards to Update";
  }
};
