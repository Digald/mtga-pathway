const settings = require("electron-settings");
const searchLogFile = require("./searchLogFile.js");
const packageCollection = require("./packageCollection.js");
const parseCards = require("./parseCards.js");
const checkForRawUserData = require("./checkForRawUserData");

/**
 * Runs when the app starts
 */
module.exports = async function(logData, mainWindow) {
  try {
    // Grab player data from the read log file
    const playerData = await searchLogFile(logData, mainWindow);
    const { playerTokens, playerCards } = playerData;
    // Save player token data immediately
    settings.set("mtgaCardData.playerTokens", playerTokens);
    // Next Update the Raw collection of cards
    const playerMainCollection = await packageCollection(playerCards);
    const storedRawData = settings.get("rawData.cards");

    // Set up variables to check difference between last time
    const { allDifferences, onlyNewCards, newQuantities } = checkForRawUserData(
      storedRawData,
      playerMainCollection
    );

    //If this is the first time running or there are new cards to parse, allDiff.length will be greater than 0
    if (allDifferences.length > 0) {
      // Only run for using the app for the first time
      console.log("executeLogFile40: Ready to parse");
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
      mainWindow.webContents.send("loading-status", {
        isLoaded: true,
        isInvalidFile: false,
        newCards: settings.get("dataToRender.newCards")
      });

      // Set app state to running
      settings.set("rawData.isRunning", true);
      console.log("nothing to update");
    }
  } catch (err) {
    console.log(err);
  }
};
