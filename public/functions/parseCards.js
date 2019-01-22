const packageCollection = require("./packageCollection");
const settings = require("electron-settings");
const fs = require("fs");
const path = require("path");

module.exports = function(playerCards) {
  const playerMainCollection = packageCollection(playerCards);

  fs.readFile(
    path.resolve(__dirname, "scryfall-oracle-cards.json"),
    "utf-8",
    function(err, data) {
      if (err) {
        console.log(err);
      }

      const jsonData = JSON.parse(JSON.stringify(data));
      if (!settings.get("onlyArenaJson")) {
        const onlyArenaJson = [];
        jsonData.map(card => {
          if (card.arena_id) {
            onlyArenaJson.push(card);
          }
        });
        settings.set("onlyArenaJson", {
          cards: onlyArenaJson
        });
      }

      const cardJson = settings.get("onlyArenaJson.cards");
      playerMainCollection.map(collection => {
        cardJson.map(card => {
          if (collection.arenaId == card.arena_id) {
            console.log(card.name);
          }
        });
      });
    }
  );
};
