/**
 * Pulls are only cards that have an updated quantity
 *
 * @param {array} allUpdates All the changes that happened since the player played last
 * @param {array} onlyNewCards Only cards that have been added to the collection
 * @return {array} Only cards that need to update quantity
 */

module.exports = function(allUpdates, onlyNewCards) {
  const comparer = otherArray => {
    return current => {
      return (
        otherArray.filter(other => {
          return other.arena_id == current.arena_id;
        }).length == 0
      );
    };
  };

  const onlyInAllUpdates = allUpdates.filter(comparer(onlyNewCards));
  const onlyInOnlyNewCards = onlyNewCards.filter(comparer(allUpdates));

  const result = onlyInAllUpdates.concat(onlyInOnlyNewCards);

  return result;
};
