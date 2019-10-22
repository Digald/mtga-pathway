/**
 * Gets data from request, parses the html and collects relevent data into an array
 *
 * @param {object} deck contains meta data and deck list of mtggoldfish decks
 * @param {array} playerCards array of all player cards and card info
 * @param {array} playerTokens array of all playertoken information
 * @return {object} contains the same meta deck with additional information for calculating how complete
 */

module.exports = function(deck, playerCards, playerTokens) {
  try {
    let currDeck = deck;
    currDeck.totalHas = 0;
    currDeck.totalNeeds = 0;
    const notMatched = [];
    // For each deck, loop through the deck list
    currDeck.deckList.forEach(deckCard => {
      deckCard.quantity = parseInt(deckCard.quantity);
      const { name, quantity } = deckCard;
      // Find out which player cards match the cards in the deck
      const hasCondition = playerCards.filter(playerCard => {
        if (playerCard) {
          return playerCard.name === name;
        }
      });

      // Transfer quantities that players own to the deckCard
      if (hasCondition.length > 0) {
        deckCard.playerHas = hasCondition[0].quantity;
      } else {
        deckCard.playerHas = 0;
      }

      // Find the basic lands and give max quantity no matter what
      if (
        name === "Forest" ||
        name === "Mountain" ||
        name === "Island" ||
        name === "Plains" ||
        name === "Swamp"
      ) {
        deckCard.playerHas = 999;
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
    currDeck.complete_WO_Wildcards = (
      (currDeck.totalHas / currDeck.totalNeeds) *
      100
    ).toFixed(0);

    currDeck.complete_W_Wildcards = 0;
    const { wcCommon, wcUncommon, wcRare, wcMythic } = playerTokens;
    let common = 0,
      uncommon = 0,
      rare = 0,
      mythic = 0;

    notMatched.forEach(card => {
      if (card.rarity === "Common") {
        common += card.quantity - card.playerHas;
      } else if (card.rarity === "Uncommon") {
        uncommon += card.quantity - card.playerHas;
      } else if (card.rarity === "Rare") {
        rare += card.quantity - card.playerHas;
      } else if (card.rarity === "Mythic") {
        mythic += card.quantity - card.playerHas;
      }
    });
    common -= parseInt(wcCommon);
    uncommon -= parseInt(wcUncommon);
    rare -= parseInt(wcRare);
    mythic -= parseInt(wcMythic);

    if (common < 0) {
      common = 0;
    }
    if (uncommon < 0) {
      uncommon = 0;
    }
    if (rare < 0) {
      rare = 0;
    }
    if (mythic < 0) {
      mythic = 0;
    }

    currDeck.complete_W_Wildcards = (
      ((currDeck.totalNeeds - (common + uncommon + rare + mythic)) /
        currDeck.totalNeeds) *
      100
    ).toFixed(0);
    return currDeck;
  } catch (err) {
    console.log(err);
    return {};
  }
};
