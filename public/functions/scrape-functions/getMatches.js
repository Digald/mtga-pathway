const settings = require("electron-settings");

// testing for this component being done in electron.js and SingleDeck.js
// should only be included in initialScrape.js when finished

module.exports = function(deck) {
  let deckList = deck;
  const playerCards = settings.get("mtgaCardData.playerMtgaCards");
  const playerTokens = settings.get("mtgaCardData.playerTokens");
  // console.log(playerCards);
  const matches = [];
  deckList.deckList.forEach(deckCard => {
    const condition = playerCards.filter(playerCard => {
      if (playerCard) {
        return playerCard.name === deckCard.name;
      }
    });
    if (condition.length > 0) {
      deckCard.playerHas = condition[0].quantity;

      if (deckCard.playerHas >= deckCard.quantity) {

      }

      matches.push(condition[0]);
    }
  });
  console.log(deckList);
  // deckList.deckList.forEach(deckCard => {
    
  // });

  // console.log(matches);
};
