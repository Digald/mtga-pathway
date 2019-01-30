/**
 * Calculates the differences in user collection between the last time they used the app and now
 *
 * @param {array} prevArr This is the previous list of card ids that player had when using the app the last time
 * @param {array} currArr This is the current collection the user has as of starting up the app
 * @return {array} This is an array of difference between the two. It may be a blank array if there are no changes
 */

module.exports = function(prevArr, currArr) {
  const differences = currArr.filter(
    element =>
      !prevArr.some(element2 => {
        if (element.arena_id === element2.arena_id) {
          return element.count === element2.count;
        }
      })
  );
  return differences;
};
