const settings = require("electron-settings");

module.exports = function(deckList) {
  const playerCards = settings.get("mtgaCardData.playerMtgaCards");
  const playerTokens = settings.get("mtgaCardData.playerTokens");
  //   console.log(deckList);
  deckList.deckList.forEach(deckCard => {
    const condition = playerCards.filter(playerCard => {
      if (playerCard) {
        return playerCard.name === deckCard.name;
      }
    });
  });
};
