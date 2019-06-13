const settings = require("electron-settings");
const searchLogFile = require("./searchLogFile.js");
const packageCollection = require("./packageCollection.js");
const calculateCountDiff = require("./calculateCountDiff.js");
const sortDifferences = require("./sortDifferences.js");
const extractNewCardQuantity = require("./extractNewCardQuantity.js");
const parseCards = require("./parseCards.js");

/**
 * NON pure function to run every time the app starts
 */
module.exports = async function(logData, mainWindow) {
  // Grab player data from the read log file
  const playerData = await searchLogFile(logData, mainWindow);
  const { playerTokens, playerCards } = playerData;
  // Save player token data immediately
  settings.set("mtgaCardData.playerTokens", playerTokens);
  // Next Update the Raw collection of cards
  const playerMainCollection = await packageCollection(playerCards);
  const storedRawData = settings.get("rawData.cards");

  // Set up variables to check difference between last time
  let allDifferences = [];
  let onlyNewCards = [];
  let newQuantities = [];
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
    allDifferences = ["first-time"];
  } else {
    allDifferences = await calculateCountDiff(
      storedRawData,
      playerMainCollection
    );
    onlyNewCards = await sortDifferences(storedRawData, playerMainCollection);
    newQuantities = await extractNewCardQuantity(allDifferences, onlyNewCards);
  }
  //If this is the first time running or there are new cards to parse, allDiff.length will be greater than 0
  if (allDifferences.length > 0) {
    // Only run for using the app for the first time
    if (allDifferences[0] === "first-time") {
      await parseCards(playerMainCollection, mainWindow);
    }
    // Run else statement when new cards are found
    else {
      settings.set("rawData.cards", playerMainCollection);
      await parseCards(onlyNewCards, mainWindow, newQuantities);
    }
  }
  // Nothing new to update, more logic to be added
  else {
    console.log("nothing to update");
  }
};
