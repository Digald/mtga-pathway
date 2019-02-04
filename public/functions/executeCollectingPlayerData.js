const settings = require('electron-settings');
const searchLogFile = require('./searchLogFile');
const updateRawCollection = require('./updateRawCollection');

module.exports = function(logData) {
  // Return player data and then destructure the object
  const playerData = searchLogFile(logData);
  const { playerTokens, playerCards } = playerData;

  // Save player token data immediately
  settings.set("mtgaCardData.playerTokens", playerTokens);

  updateRawCollection(playerCards);
};
