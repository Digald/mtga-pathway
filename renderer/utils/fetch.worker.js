import axios from "axios";
import cheerio from "cheerio";
import scrapeDeckList from "./scrapeDeckList";
import getMatches from "./getMatches";

self.addEventListener("message", async event => {
  const {
    decksAge,
    playerCards,
    playerTokens,
    isFirstTimeWorker,
    decks
  } = event.data;
  // Test to see if more than a day has passed
  if (
    (parseFloat(Date.now()) / 1000 - parseFloat(decksAge) < 86400 &&
      !isFirstTimeWorker) ||
    decks
  ) {
    // grab local storage decks
    const allDecksData = decks.map(singleDeck => {
      const calculatedSingleDeck = getMatches(
        singleDeck,
        playerCards,
        playerTokens
      );
      return calculatedSingleDeck;
    });
    self.postMessage(allDecksData);
    return;
  }
  // initiate scrape (function 1)
  const mainURL =
    "https://cors-anywhere.herokuapp.com/https://www.mtggoldfish.com/metagame/arena_standard/full#paper";
  let response;
  try {
    response = await axios.get(mainURL);
  } catch (err) {
    console.log(err);
  }
  const $ = await cheerio.load(response.data);
  const allDecksData = $(".archetype-tile")
    .map(async function(i, elem) {
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
      singleDeck.url = "https://cors-anywhere.herokuapp.com/" + finalUrl;

      // decklist (function 2)
      const finishedSingleDeck = await scrapeDeckList(singleDeck);
      singleDeck.deckList = finishedSingleDeck;
      // get matches for decks (function 3)
      const calculatedSingleDeck = getMatches(
        singleDeck,
        playerCards,
        playerTokens
      );
      return calculatedSingleDeck;
    })
    .get();
  Promise.all(allDecksData).then(vals => {
    self.postMessage(vals);
  });
  return;
});
