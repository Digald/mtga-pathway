/**
 * Re-organizes the array that includes the card ids and counts into an array of objects where both the card ids and counts are properties that can be accessed
 *
 * @param {object} playerCards object where the id of a card is the property, and the amount of each card is the value
 * @return {array} An array of objects. each object contains the arena id and number of cards as values. ex. {arenaId: 34534,  num: 2}
 */

module.exports = function(playerCards) {
  try {
    console.log(playerCards);
    const cardIds = Object.keys(playerCards);
    const cardAmt = Object.values(playerCards);

    const playerMainCollection = [];
    cardIds.forEach((id, index) => {
      playerMainCollection.push({
        arena_id: id,
        quantity: cardAmt[index]
      });
    });
    console.log(playerMainCollection);
    return playerMainCollection;
  } catch (err) {
    console.log(err);
    return;
  }
};
