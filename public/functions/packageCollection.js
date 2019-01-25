const settings = require("electron-settings");

/**
 * @param {object} playerCards object where the id of a card is the property, and the amount of each card is the value
 * @return {array} An array of objects. each object contains the arena id and number of cards as values. ex. {arenaId: 34534,  num: 2}
 */

module.exports = function(playerCards) {
  const cardIds = Object.keys(playerCards);
  const cardAmt = Object.values(playerCards);

  const playerMainCollection = [];
  cardIds.forEach((id, index) => {
    playerMainCollection.push({
      arena_id: id,
      count: cardAmt[index]
    });
  });

  // Give raw data to electron settings
  settings.set("rawData.cards", playerMainCollection);

  return playerMainCollection;
};
