const settings = require("electron-settings");
const fs = require("fs");
const path = require("path");

module.exports = function(playerMainCollection) {
  console.log('have to parse');
  //
  fs.readFile(
    path.resolve(__dirname, "../data/arenaCards.json"),
    "utf8",
    async (err, data) => {
      if (err) {
        console.log(err);
      }

      // doesn't have to keep being saved
      settings.set("mtgaCardData.allMtgArenaCards", JSON.parse(data));

      // has to be updated every time
      const pullOutPlayersCards = playerMainCollection.map(async playerCard => {
        let foundCard;

        await settings
          .get("mtgaCardData.allMtgArenaCards")
          .forEach(async card => {
            if (playerCard.arena_id == card.arena_id) {
              foundCard = card;
            }
          });
        return foundCard;
      });
      const pulledPlayerCards = await Promise.all(pullOutPlayersCards);

      settings.set("mtgaCardData.playerMtgArenaCards", pulledPlayerCards);
    } // end callback
  );
};
