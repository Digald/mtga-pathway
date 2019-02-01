/**
 * Calculates the difference between two input arrays only returns the brand new cards obtained
 *
 * @param {array} prevArr This is the previous list of card ids that player had when using the app the last time
 * @param {array} currArr This is the current collection the user has as of starting up the app
 * @return {array} Brand new cards in player's collection
 */

module.exports = function(prevArr, currArr) {
  const differences = currArr.filter(
    element =>
      !prevArr.some(element2 => {
        return element.arena_id === element2.arena_id;
      })
  );
  return differences;
};
