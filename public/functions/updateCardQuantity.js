const settings = require("electron-settings");

/**
 * Updates the card quantity for all stored player collection cards
 *
 * @param {array} cardsToUpdate Contains all cards that have a new quantity to be udpated
 */

module.exports = function(cardsToUpdate) {
  const playerMtgaCards = settings.get("mtgaCardData.playerMtgaCards");
  console.log(typeof playerMtgaCards);
  playerMtgaCards.forEach(card => {
    cardsToUpdate.forEach(newData => {
      if (card.arena_id === newData.arena_id) {
        card.quantity = newData.quantity;
        console.log('card quantity updated');
      }
    });
  });
};
