const axios = require("axios");
const cheerio = require("cheerio");
const scrapeDeckList = require("./scrapeDeckList.js");
const getMatches = require("./getMatches.js");
const settings = require("electron-settings");

/**
 * Gets data from request, parses the html and collects relevent data into an array
 *
 * @param {object} event event passed from the ipcMain
 *
 * @return {array} Contains list of objects start with meta data for the deck as well as the deck list and quantities
 */

module.exports = async function(event) {
  // Initate data
  const allDecksData = [];
  settings.set("mtgaCardData.minedDecks", []);

  // Initial url of all decks
  const mainUrl = "https://www.mtggoldfish.com/metagame/standard/full#paper";
  let response;
  try {
    response = await axios.get(mainUrl);
  } catch (err) {
    console.log(err);
  }
  const $ = cheerio.load(response.data);

  const loopLength = $(".archetype-tile").length;
  let loopCount = 0;
  // Grab meta data for each deck
  await $(".archetype-tile").each(async function(i, elem) {
    let singleDeck = {};

    // name
    singleDeck.name = $(this)
      .find(".deck-price-online")
      .children()
      .text()
      .trim();

    // colors
    const colorsList = [];
    $(this)
      .find(".manacost")
      .children()
      .each(function(i, elem) {
        colorsList.push(
          $(this)
            .attr("alt")
            .trim()
        );
      });
    singleDeck.colors = colorsList;

    // url
    const baseUrl = "https://www.mtggoldfish.com";
    const pathLink = $(this)
      .find("h2 .deck-price-paper a")
      .attr("href")
      .trim();
    const finalUrl = baseUrl + pathLink.replace("#paper", "#arena");
    singleDeck.url = finalUrl;

    // decklist
    const finishedSingleDeck = await scrapeDeckList(singleDeck);
    singleDeck.deckList = finishedSingleDeck;

    // set single deck and move on to next one in loop
    const calculatedSingleDeck = getMatches(singleDeck);
    const minedDecks = settings.get("mtgaCardData.minedDecks");
    settings.set("mtgaCardData.minedDecks", [
      ...minedDecks,
      calculatedSingleDeck
    ]);
    allDecksData.push(calculatedSingleDeck);
    loopCount += 1;
  });

  function checkForReturn() {
    if (loopCount === loopLength) {
      event.sender.send(
        "grab-decks-response",
        settings.get("mtgaCardData.minedDecks")
      );
      return allDecksData;
    } else {
      setTimeout(checkForReturn, 5000);
    }
  }

  return checkForReturn();
};
