/**
 * BE SURE TO MANUALLY ADD SCRYFALL-ORACLE-CARDS.JSON TO THE DATA DIRECTORY BEFORE RUNNING THIS FILE. 
 * 
 * THIS FILE IS USED TO SEED THE SOUCE CODE REPO WITH THE LATEST CARD UPDATES
 */

const fs = require("fs");
const path = require("path");

// File path to the data should just be inside the data folder
const pathToMainJson = path.resolve(
  __dirname,
  "data",
  "scryfall-oracle-cards.json"
);

// Import that particular file
const allData = JSON.parse(fs.readFileSync(pathToMainJson, "utf-8"));

// Initialize variables for writing json data
let xln = [];

// The loop that will break the files down
allData.map(card => {
  if (card.arena_id) {
    console.log(card.set_name);
    if (card.set === "xln") {
      xln.push(card);
    }
  }
});

if (!fs.existsSync(path.resolve(__dirname, "data", "xln.json"))) {
  fs.writeFileSync(
    path.resolve(__dirname, "data", "xln.json"),
    JSON.stringify(xln, null, 2)
  );
}
