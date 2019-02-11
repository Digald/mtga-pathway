const settings = require("electron-settings");
const fs = require("fs");
const path = require("path");
const updateCardQuantity = require("./updateCardQuantity");
const {ipcMain} = require('electron');

module.exports = function(fromPlayerCollection, newQuantities = []) {
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
      settings.set("mtgaCardData.allMtgaCards", JSON.parse(data));

      // Map through the new cards you want to translate
      const pullOutPlayersCards = fromPlayerCollection.map(async playerCard => {
        // foundCard will contain the data on parsed card
        let foundCard;

        // Now loop through all standard cards with forEach, if the arena_ids match, assign it to foundCard variable
        await settings.get("mtgaCardData.allMtgaCards").forEach(async card => {
          if (playerCard.arena_id == card.arena_id) {
            foundCard = card;
            foundCard.quantity = playerCard.quantity;
          }
        });
        return foundCard;
      });

      // Wait for the promise before using the parsed player cards
      const pulledPlayerCards = await Promise.all(pullOutPlayersCards);

      // Finally set the player cards into storage
      let spreadNewPlayerCards = [];
      if (
        !settings.get("mtgaCardData.playerMtgaCards") ||
        settings.get("mtgaCardData.playerMtgaCards").length < 1
      ) {
        spreadNewPlayerCards = pulledPlayerCards;
      } else {
        spreadNewPlayerCards = [
          ...settings.get("mtgaCardData.playerMtgaCards"),
          ...pulledPlayerCards
        ];
      }

      // Store relevent data
      settings.set("dataToRender.newCards", pulledPlayerCards);
      settings.set("mtgaCardData.playerMtgaCards", spreadNewPlayerCards);

      // After parsing all player cards, update quantities for card already owned
      if (newQuantities.length > 0) {
        updateCardQuantity(newQuantities);
      }
      console.log("Player Cards have been Set");
    } // end callback
  );
};
