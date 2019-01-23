const axios = require("axios");
const settings = require("electron-settings");

module.exports = async function(playerMainCollection) {
  console.log(playerMainCollection.length);

  async function fetchApiData(url = "https://api.scryfall.com/cards", count = 1) {
      console.log(count);
    // Set up stored data if not already
    if (!settings.get("allcards.data")) {
      settings.set("allCards", {
        data: []
      });
    }

    // 1) Perform inital request
    const initialApiRequest = await axios.get(url);
    const initialApiData = initialApiRequest.data.data;

    // 2) Pull out only arena cards
    const arenaOnlyCards = initialApiData.map(card => {
      if (card.arena_id) {
        return card;
      }
    });

    // 3) Store cards for that page
    const pullOutCurrentData = settings.get("allCards.data");
    settings.set("allCards", {
      data: [...pullOutCurrentData, ...arenaOnlyCards]
    });

    // console.log(settings.get("allCards.data").length);

    // 4) Check if there is another page of cards to make a request for
    if (initialApiRequest.data.has_more) {
      const counter = count + 1;
      fetchApiData(initialApiRequest.next_page, counter);
    }
    return;
  }

  fetchApiData();
};
