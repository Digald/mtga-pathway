/**
 * @param {string} logData The text of the entire mtg arena log file with spaces and carriage removed
 * @return {object} An object with two properties, playerTokens and playerCards. playerTokens holds meta game currency and playerCards holds the player's current collection
 */

module.exports = function(logData) {
  // Use regular express and collect all matches into the var, match
  const regex = /\{(?:[^{}]|())*\}/g;
  const match = logData.match(regex);

  // Define vars to capture the player information
  // Map over each of the matches extracting desired data
  let playerTokens;
  let playerCards;
  match.map(i => {
    if (i.includes("gold") && i.includes("playerId")) {
      playerTokens = JSON.parse(i);
    }
    const stringPattern = /"\d\d\d\d\d":.\d?\d,/g;
    if (i.search(stringPattern) > 1) {
      playerCards = JSON.parse(i);
    }
    return null;
  });
  return { playerTokens, playerCards };
};
