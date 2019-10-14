/**
 * Calculates the differences in user collection between the last time they used the app and now
 *
 * @param {array} prevArr This is the previous list of card ids that player had when using the app the last time
 * @param {array} currArr This is the current collection the user has as of starting up the app
 * @return {array} Contains all brand new cards and cards with new quantities that player now owns
 */

module.exports = function(prevArr, currArr) {
  try {
    const differences = currArr.filter(
      element =>
        !prevArr.some(element2 => {
          if (element.arena_id === element2.arena_id) {
            return element.quantity === element2.quantity;
          }
        })
    );
    return differences;
  } catch(err) {
    console.log(err);
    return [];
  }
};
