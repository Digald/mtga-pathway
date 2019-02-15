// module.exports = async function($) {
//   let singleDeck = {};

//   // name
//   singleDeck.name = $(this)
//     .find(".deck-price-online")
//     .children()
//     .text()
//     .trim();

//   // colors
//   const colorsList = [];
//   $(this)
//     .find(".manacost")
//     .children()
//     .each(function(i, elem) {
//       colorsList.push(
//         $(this)
//           .attr("alt")
//           .trim()
//       );
//     });
//   singleDeck.colors = colorsList;

//   // url
//   const baseUrl = "https://www.mtggoldfish.com";
//   const pathLink = $(this)
//     .find("h2 .deck-price-paper a")
//     .attr("href")
//     .trim();
//   const finalUrl = baseUrl + pathLink.replace("#paper", "#arena");
//   singleDeck.url = finalUrl;

//   // decklist
//   const finishedSingleDeck = await scrapeDeckList(singleDeck);
//   singleDeck.deckList = finishedSingleDeck;

//   // set single deck and move on to next one in loop
//   const minedDecks = settings.get("mtgaCardData.minedDecks");
//   settings.set("mtgaCardData.minedDecks", [...minedDecks, singleDeck]);
//   allDecksData.push(singleDeck);

// }