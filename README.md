# MTGA Pathway

Find the closest competitive or meta MTGA decks you are closest to building with your current collection. This desktop application helps new and veteran Magic: The Gathering Arena players focus how to make the most of their current collection by following what competitive decks can be played now.

## Work In Project Status
There are three main phases to overcome as I work on this project:

1) Obtain log file player data and parse into useful information - Complete
2) View and user interface - Complete
3) Aquire data on popular decks through an API or through scraping - Complete
4) Final App Logic and Display Matches - Complete

(4/4) Complete

Currently working on getting an alpha version up.

## Updates

If a new set comes out or new card data needs to be added to the app, manually run the instructions on seedCardData.js found in /public/seedCardData.js.

## Electron Settings Queries
```
rawData: {
    cards: // Array of arena id's and quantity from the log file
}

mtgaCardData: {
    playerMtgaCards: // Array of card data in player's collection,
    allMtgaCards: // Array of all card data from the log file
    playerTokens: // Array of all player wildcards, gems, gold, etc,
    minedDecks: // Array of decks from source providing data
    savedDecks: // Array of decks saved for future reference
}

dataToRender: {
    newCards: // Array of cards newly added to collection,
    insideDecklist: // Object containing the details of a single deck
}
```

## Getting Started

TBD

### Prerequisites

TBD

### Installing

TBD

## Running the tests

TBD

## Deployment

TBD

## Built With

* [Electron](https://electronjs.org/docs) - Cross platform desktop apps with JavaScript, HTML, and CSS
* [React](https://reactjs.org/docs/getting-started.html) - Front-End Framework

## Contributing

TBD

## Authors

* **Mark Alaniz** - *Initial work* - [Digald](https://github.com/Digald)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

TBD
