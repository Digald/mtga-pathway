const axios = require("axios");
const cheerio = require("cheerio");
const scrapeDeckList = require("./deck-scrapeDeckList");

/**
 * Gets data from request, parses the html and collects relevent data into an array
 */

module.exports = async function() {
  // Initate data
  const allDecksData = [];
  // Initial url of all decks
  const mainUrl = "https://www.mtggoldfish.com/metagame/standard/full#paper";
  const getDeckInfo = await axios.get(mainUrl);
  const $ = cheerio.load(getDeckInfo.data);

  // Grab meta data for each deck
  $(".archetype-tile").each(function(i, elem) {
    let singleDeck = {};

    // name
    singleDeck.name = $(this)
      .find(".deck-price-online")
      .children()
      .text();

    // colors
    const colorsList = [];
    $(this)
      .find(".manacost")
      .children()
      .each(function(i, elem) {
        colorsList.push($(this).attr("alt"));
      });
    singleDeck.colors = colorsList;

    // url
    const baseUrl = "https://www.mtggoldfish.com";
    const pathLink = $(this)
      .find("h2 .deck-price-paper a")
      .attr("href");
    const finalUrl = baseUrl + pathLink.replace("#paper", "#arena");
    singleDeck.url = finalUrl;

    const finishedSingleDeck = scrapeDeckList(singleDeck);

    // console.log(finishedSingleDeck);
  });
};
