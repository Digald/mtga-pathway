const settings = require("electron-settings");
const sortDifferences = require("./sortDifferences");
const calculateCountDiff = require("./calculateCountDifference");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const extractNewCardQuantity = require("./extractNewCardQuantity");

module.exports = function(playerCards) {
  // Reorganized player collection array
  const playerMainCollection = packageCollection(playerCards);

  const storedRawData = settings.get("rawData.cards");

  /**
   * Check if there are any differences in cards from last time the app was used
   */
  // Array going to contain all difference, new cards and new quantities
  let allDiff = [];

  // Array only going to contain new cards obtained
  let onlyNewCards = [];

  // Array containing only cards with updated quantities
  let newQuantities = [];

  // If there is no saved data found
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
    allDiff = ["first-time"];
  }

  // If there is already data saved, check if it needs to be udpated. Find the differences and combine them
  else {
    allDiff = calculateCountDiff(storedRawData, playerMainCollection);
    onlyNewCards = sortDifferences(storedRawData, playerMainCollection);
    newQuantities = extractNewCardQuantity(allDiff, onlyNewCards);
    // onlyNewCards = [{arena_id: "67804", quantity: 1}];
    // allDiff = [{ arena_id: "68656", quantity: 3 }, {arena_id: "67804", quantity: 1}];
    // newQuantities = [{ arena_id: "68656", quantity: 3 }];
  }

  //If this is the first time running or there are new cards to parse, allDiff.length will be greater than 0
  if (allDiff.length > 0) {
    // Only run for using the app for the first time
    if (allDiff[0] === "first-time") {
      parseCards(playerMainCollection);
    }

    // Run else statement when new cards are found
    else {
      settings.set("rawData.cards", playerMainCollection);
      parseCards(onlyNewCards, newQuantities);
    }
  }

  // Nothing new to update, more logic to be added
  else {
    console.log("nothing to update");
    return "No Cards to Update";
  }
};
