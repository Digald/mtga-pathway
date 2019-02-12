const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Take the meta data of each deck and request the page with the deck list. Aquire that data and return a completed object
 *
 * @param {object} singleDeck Contains the name, colors, and url of the deck in question
 *
 * @return {object} Contains the name, colors, url, and newly added decklist array
 */

module.exports = async function(singleDeck) {
    const data = await axios.get(singleDeck.url);
    const $ = cheerio.load(data.data);

    $(' #tab-arena .deck-view-deck-table tbody tr').each(function(i, elem) {
        if ($(this).children('.deck-header').text()) {
            return;
        }
        $(this).children().each(function(i, elem) {
            console.log($(this).text().trim());
        });
    });

};
