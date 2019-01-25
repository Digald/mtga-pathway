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
let arenaCards = [];
const sets = ["xln", "rix", "dom", "m19", "grn", "rna"];

// let xln = [];
// let rix = [];
// let dom = [];
// let m19 = [];
// let grn = [];
// let rna = [];
// let otherArenaSets = [];
// const setList = [
//   { name: "xln", data: xln },
//   { name: "rix", data: rix },
//   { name: "dom", data: dom },
//   { name: "m19", data: m19 },
//   { name: "grn", data: grn },
//   { name: "rna", data: rna },
//   { name: "otherArenaSets", data: otherArenaSets }
// ];

// The loop that will break the files down
allData.forEach(card => {
  // Out of all the cards, check which ones have an arena_id
  if (card.arena_id && card.legalities.standard === "legal") {
    // Extract desired data
    const desiredData = {
      object: card.object,
      arena_id: card.arena_id,
      name: card.name,
      image_uris: card.image_uris,
      mana_cost: card.mana_cost,
      cmc: card.cmc,
      color: card.colors,
      color_identity: card.color_identity,
      set: card.set,
      rarity: card.rarity
    };

    // For those that are in mtga, extract cards for each specific sets
    arenaCards.push(desiredData);

    // switch (card.set) {
    //   case "xln":
    //     xln.push(desiredData);
    //     break;
    //   case "rix":
    //     rix.push(desiredData);
    //     break;
    //   case "dom":
    //     dom.push(desiredData);
    //     break;
    //   case "m19":
    //     m19.push(desiredData);
    //     break;
    //   case "grn":
    //     grn.push(desiredData);
    //     break;
    //   case "rna":
    //     rna.push(desiredData);
    //     break;
    //   default:
    //     otherArenaSets.push(desiredData);
    //     break;
    // }
  }
});

console.log(arenaCards.length);

fs.writeFileSync(
  path.resolve(__dirname, "data", `arenaCards.json`),
  JSON.stringify(arenaCards, null, 2)
);

// setList.forEach(set => {
//   fs.writeFileSync(
//     path.resolve(__dirname, "data", `${set.name}.json`),
//     JSON.stringify(set.data, null, 2)
//   );
// });
