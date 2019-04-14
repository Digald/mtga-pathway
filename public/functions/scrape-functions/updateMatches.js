const settings = require("electron-settings");
const getMatches = require("./getMatches");
/**
 *
 */

module.exports = function() {
  const arrayOfDecksToUpdate = settings.get("mtgaCardData.minedDecks");
  if (!arrayOfDecksToUpdate) return;
  arrayOfDecksToUpdate.forEach(singleDeck => {
    getMatches(singleDeck);
  });
};
