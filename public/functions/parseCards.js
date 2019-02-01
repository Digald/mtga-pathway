const settings = require("electron-settings");
const fs = require("fs");
const path = require("path");

module.exports = function(playerMainCollection) {
  console.log("have to parse");

  // Read data inside JSON file containing all standard card data
  fs.readFile(
    path.resolve(__dirname, "../data/arenaCards.json"),
    "utf8",
    async (err, data) => {
      if (err) {
        console.log(err);
      }

      // Saves all that data locally
      settings.set("mtgaCardData.allMtgArenaCards", JSON.parse(data));

      // Map through the new cards you want to translate
      const pullOutPlayersCards = playerMainCollection.map(async playerCard => {
        // foundCard will contain the data on parsed card
        let foundCard;

        // Now loop through all standard cards with forEach, if the arena_ids match, assign it to foundCard variable
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
