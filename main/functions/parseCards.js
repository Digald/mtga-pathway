const settings = require("electron-settings");
const fs = require("fs");
const path = require("path");
const updateCardQuantity = require("./updateCardQuantity");
const updateMatches = require("./updateMatches");
/**
 * Takes all arena id's from the log and parses them into card data taken from arenaCards.json
 *
 * @param {array} fromPlayerCollection array of objects containing card ids and quantities
 * @param {array} newQuantities if no new cards are added but the quantities have changed, this is an array of those cards
 * @return
 */

module.exports = function(
  fromPlayerCollection,
  mainWindow,
  newQuantities = []
) {
  try {
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
        const allCards = settings.get("mtgaCardData.allMtgaCards");

        // Map through the new cards you want to translate
        const pullOutPlayersCards = fromPlayerCollection.map(
          async playerCard => {
            console.log(playerCard);
            foundCard = allCards[playerCard.arena_id];
            console.log(foundCard);
            if (foundCard) {
              foundCard.quantity = playerCard.quantity;
              return foundCard;
            }
            return;
          }
        );

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
          await updateCardQuantity(newQuantities);
        }
        await updateMatches();

        // Send status to make front end ready to use
        // console.log(settings.get("mtgaCardData.playerMtgaCards"));
        mainWindow.webContents.send("loading-status", {
          isLoaded: true,
          isInvalidFile: false,
          newCards: settings.get("dataToRender.newCards"),
          playerCards: settings.get("mtgaCardData.playerMtgaCards"),
          playerTokens: settings.get("mtgaCardData.playerTokens")
        });

        // Set app state to running
        settings.set("rawData.isRunning", true);

        console.log("Player Cards have been Set");
      } // end callback
    );
  } catch (err) {
    console.log(err);
  }
  return;
};
