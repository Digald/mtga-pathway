/**
 * Pulls are only cards that have an updated quantity
 *
 * @param {array} allUpdates All the changes that happened since the player played last
 * @param {array} onlyNewCards Only cards that have been added to the collection
 * @return {array} Only cards that need to update quantity
 */

module.exports = function(allUpdates, onlyNewCards) {
  let newQuantities = [];
  allUpdates.forEach(element => {
    const nonMatchingIds = onlyNewCards.filter(element2 => {
      return element.arena_id !== element2.arena_id;
    });
    newQuantities = nonMatchingIds;
  });
  return newQuantities;
};
