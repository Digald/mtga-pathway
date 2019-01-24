/**
 * BE SURE TO MANUALLY ADD SCRYFALL-DEFAULT-CARDS.JSON TO THE DATA DIRECTORY BEFORE RUNNING THIS FILE from https://scryfall.com/docs/api/bulk-data
 *
 * THIS FILE IS USED TO SEED THE SOUCE CODE REPO WITH THE LATEST CARD UPDATES
 * 
 * SIMPLY RUN: YARN SEED
 *
 * REMOVE SCRYFALL JSON FILE BEFORE PUSHING TO YOUR REPO.
 * 
 */

const fs = require("fs");
const path = require("path");

// File path to the data should just be inside the data folder
const pathToMainJson = path.resolve(
  __dirname,
  "data",
  "scryfall-default-cards.json"
);

// Import that particular file
const allData = JSON.parse(fs.readFileSync(pathToMainJson, "utf-8"));

// Initialize mtg set variables for writing json data
let xln = [];
let rix = [];
let dom = [];
let m19 = [];
let grn = [];
let rna = [];
let otherArenaSets = [];
const setList = [
  { name: "xln", data: xln },
  { name: "rix", data: rix },
  { name: "dom", data: dom },
  { name: "m19", data: m19 },
  { name: "grn", data: grn },
  { name: "rna", data: rna },
  { name: "otherArenaSets", data: otherArenaSets }
];

// The loop that will break the files down
allData.forEach(card => {
  // Out of all the cards, check which ones have an arena_id
  if (card.arena_id && card.legalities.standard === "legal") {
    // Extract desired data
    

    // For those that are in mtga, extract cards for each specific sets
    switch (card.set) {
      case "xln":
        xln.push(card);
        break;
      case "rix":
        rix.push(card);
        break;
      case "dom":
        dom.push(card);
        break;
      case "m19":
        m19.push(card);
        break;
      case "grn":
        grn.push(card);
        break;
      case "rna":
        rna.push(card);
        break;
      default:
        otherArenaSets.push(card);
        break;
    }
  }
});

setList.forEach(set => {
  fs.writeFileSync(
    path.resolve(__dirname, "data", `${set.name}.json`),
    JSON.stringify(set.data, null, 2)
  );
});
