const settings = require("electron-settings");
const calculateCountDiff = require("./calculateCountDiff.js");
const sortDifferences = require("./sortDifferences.js");
const extractNewCardQuantity = require("./extractNewCardQuantity.js");
/**
 * Checks to see if there is already card data stored. If none, saved the log file cards and say it is the first time running. If there are cards, check for any differences and return them.
 * @param {array} storedRawData list of objects containing arena card ids and quantities of those cards that have been stored in settings already
 * @param {array} playerMainCollection list of objects containing arena card ids and quantities DIRECTLY from the current log file
 * @return {object} allDifferences are all card quantities and unique cards. onlyNewCards and newQuantities are arrays that contain only that, new cards and quantities.
 */

module.exports = function(storedRawData, playerMainCollection) {
  let allDifferences = [],
    onlyNewCards = [],
    newQuantities = [];
  try {
    if (!storedRawData) {
      settings.set("rawData.cards", playerMainCollection);
      allDifferences = ["first-time"];
    } else {
      allDifferences = calculateCountDiff(storedRawData, playerMainCollection);
      onlyNewCards = sortDifferences(storedRawData, playerMainCollection);
      newQuantities = extractNewCardQuantity(allDifferences, onlyNewCards);
    }
  } catch (err) {
    console.log(err);
  }
  return { allDifferences, onlyNewCards, newQuantities };
};
