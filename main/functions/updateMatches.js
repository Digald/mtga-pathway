const settings = require("electron-settings");
const getMatches = require("./getMatches");
/**
 * Grabs all scraped decks and for each one, updates the percentage of cards owned by the user
 */

module.exports = function() {
  try {
    const arrayOfDecksToUpdate = settings.get("mtgaCardData.minedDecks");
    if (!arrayOfDecksToUpdate) return;
    arrayOfDecksToUpdate.forEach(singleDeck => {
      getMatches(singleDeck);
    });
  } catch (err) {
    console.log(err);
  }
};
