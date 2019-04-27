const { dialog } = require("electron");
const readLogFile = require("./readLogFile");
const searchLogFile = require("./searchLogFile");
const calculateCountDiff = require("./calculateCountDifference");
const sortDifferences = require("./sortDifferences");
const extractNewCardQuantity = require("./extractNewCardQuantity");
const packageCollection = require("./packageCollection");
const parseCards = require("./parseCards");
const settings = require('electron-settings');

module.exports = async function(mainWindow) {
  // Opens dialog window to navagate to log file
  const fileArr = dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      {
        name: "Text Log Files",
        extensions: ["txt"]
      }
    ]
  });

  // if no files
  if (!fileArr) return;
  const filePath = fileArr[0];
  settings.set('rawData.path', filePath);
  const logData = readLogFile(filePath);

  // Grab player data from the read log file
  const playerData = await searchLogFile(logData, mainWindow);
  const { playerTokens, playerCards } = playerData;
  // Save player token data immediately
  settings.set("mtgaCardData.playerTokens", playerTokens);

  // Next Update the Raw collection of cards
  // updateRawCollection(playerCards);
  const playerMainCollection = packageCollection(playerCards);
  const storedRawData = settings.get("rawData.cards");
  let allDifferences = [];
  let onlyNewCards = [];
  let newQuantities = [];
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
    allDifferences = ["first-time"];
  } else {
    allDifferences = calculateCountDiff(storedRawData, playerMainCollection);
    onlyNewCards = sortDifferences(storedRawData, playerMainCollection);
    newQuantities = extractNewCardQuantity(allDifferences, onlyNewCards);
    // onlyNewCards = [{arena_id: "67804", quantity: 1}];
    // allDiff = [{ arena_id: "68656", quantity: 3 }, {arena_id: "67804", quantity: 1}];
    // newQuantities = [{ arena_id: "68656", quantity: 3 }];
  }
  //If this is the first time running or there are new cards to parse, allDiff.length will be greater than 0
  if (allDifferences.length > 0) {
    // Only run for using the app for the first time
    if (allDifferences[0] === "first-time") {
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
  }

};
