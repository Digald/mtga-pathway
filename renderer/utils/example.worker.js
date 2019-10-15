import axios from "axios";
import cheerio from "cheerio";

self.addEventListener("message", async event => {
  const mainURL =
    "https://cors-anywhere.herokuapp.com/https://www.mtggoldfish.com/metagame/arena_standard/full#paper";
  let response;
  try {
    response = await axios.get(mainURL);
  } catch (err) {
    console.log(err);
  }
  const $ = cheerio.load(response.data);
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

    console.log(singleDeck);
  });
});
