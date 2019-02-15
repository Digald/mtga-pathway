const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Take the meta data of each deck and request the page with the deck list. Aquire that data and return a completed object
 *
 * @param {object} singleDeck Contains the name, colors, and url of the deck in question
 *
 * @return {array} Contains an arry of objects for each card in the deck. Objects include name and quantity.
 */

module.exports = async function(singleDeck) {
  let response;
  try {
    response = await axios.get(singleDeck.url);
  } catch (err) {
    console.log(err);
  }
  const $ = cheerio.load(response.data);

  // deckList containers list of objects for each card, cardType is where the card belongs in the deck
  const deckList = [];
  let cardType = "";

  // Loop through each line in the decklist
  await $(" #tab-arena .deck-view-deck-table tbody tr").each(function(i, elem) {
    const singleCardData = {};
    if (
      $(this)
        .children(".deck-header")
        .text()
    ) {
      cardType = $(this)
        .children(".deck-header")
        .text()
        .trim();
      return;
    }

    // card name
    singleCardData.name = $(this)
      .children(".deck-col-card")
      .text()
      .trim();

    // quantity
    singleCardData.quantity = $(this)
      .children(".deck-col-qty")
      .text()
      .trim();

    // card type/placement
    singleCardData.type = cardType
      .match(/[a-zA-Z]/g)
      .slice(0)
      .join("");

    deckList.push(singleCardData);
  });
  return deckList;
};
