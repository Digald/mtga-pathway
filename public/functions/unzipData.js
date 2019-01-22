const fs = require("fs");
const path = require("path");
const unzip = require("unzip");

module.exports = async function() {
  await fs.createReadStream(
    path.resolve(__dirname, "scryfall-oracle-cards.zip")
  ).pipe(unzip.Extract({ path: __dirname }));
};
