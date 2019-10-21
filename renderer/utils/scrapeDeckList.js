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
  const deckList = [];
  try {
    response = await axios.get(singleDeck.url);
    const $ =  await cheerio.load(response.data);
    // deckList containers list of objects for each card, cardType is where the card belongs in the deck
    let cardType = "";

    // Loop through each line in the decklist
    $(" #tab-arena .deck-view-deck-table tbody tr").each(function(
      i,
      elem
    ) {
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

      // Image
      singleCardData.image = $(this)
        .find(".deck-col-card a")
        .data("full-image");

      // Mana cost; gonna have to loop
      const cardCost = [];
      $(this)
        .find(".manacost")
        .children()
        .each(function(i, elem) {
          cardCost.push(
            $(this)
              .attr("alt")
              .trim()
          );
        });
      singleCardData.mana_cost = cardCost;

      // rarity
      singleCardData.rarity = $(this)
        .children(".deck-col-price")
        .text()
        .trim()
        .split("")
        .slice(2)
        .join("");

      // card type/placement
      singleCardData.type = cardType
        .match(/[a-zA-Z]/g)
        .slice(0)
        .join("");

      deckList.push(singleCardData);
    });
  } catch (err) {
    console.log(err);
  }
  return deckList;
};
