const settings = require("electron-settings");

// testing for this component being done in electron.js and SingleDeck.js
// should only be included in initialScrape.js when finished
/**
 * Gets data from request, parses the html and collects relevent data into an array
 *
 * @param {object} deck contains meta data and deck list of mtggoldfish decks
 *
 * @return {object} contains the same meta deck with additional information for calculating how complete
 */

module.exports = function(deck) {
  let currDeck = deck;
  currDeck.totalHas = 0;
  currDeck.totalNeeds = 0;
  const playerCards = settings.get("mtgaCardData.playerMtgaCards");
  const playerTokens = settings.get("mtgaCardData.playerTokens");
  const notMatched = [];

  currDeck.deckList.forEach(deckCard => {
    deckCard.quantity = parseInt(deckCard.quantity);
    const { name, quantity } = deckCard;
    const hasCondition = playerCards.filter(playerCard => {
      if (playerCard) {
        return playerCard.name === name;
      }
    });

    // Transfer quantities that players own
    if (hasCondition.length > 0) {
      deckCard.playerHas = hasCondition[0].quantity;
    } else if (
      name === "Forest" ||
      name === "Mountain" ||
      name === "Island" ||
      name === "Plains" ||
      name === "Swamp"
    ) {
      deckCard.playerHas = 999;
    } else {
      deckCard.playerHas = 0;
    }

    // Make owned quantity equal to needed quantity
    if (deckCard.playerHas >= quantity) {
      deckCard.playerHas = quantity;
    } else if (deckCard.playerHas < quantity) {
      notMatched.push(deckCard);
    }

    // Tally up total amount owned and total amount needed
    currDeck.totalHas += deckCard.playerHas;
    currDeck.totalNeeds += deckCard.quantity;
  });

  // Calculate percentage WO/wildcares
  currDeck.complete_WO_Wildcards =
    (currDeck.totalHas / currDeck.totalNeeds) * 100;
  console.log(notMatched);
  // console.log(currDeck);
};
