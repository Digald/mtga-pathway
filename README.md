# MTGA Pathway

Find the closest competitive or meta MTGA decks you are closest to building with your current collection. This desktop application helps new and veteran Magic: The Gathering Arena players focus how to make the most of their current collection by following what competitive decks can be played now.

**Check it out at: https://mtgapathway.netlify.com/** 

![Preview!](https://i.gyazo.com/3359b407d5db2244f5f8b90d0b9bb85a.png)

## Getting Started

### Prerequisites

* Have Magic: The Gathering Arena installed on your home directory. The `output_log.txt` 

* At the moment of writing this, MTGA is only available on Windows. So Windows is required at the moment.

### Installing

```
yarn install
```

```
yarn start
```


### Electron Settings Queries
Data persists on the user's computer using [electron-settings](https://www.npmjs.com/package/electron-settings). 

```js
rawData: {
    cards: // Array of raw arena id's and quantity from the log file
    path: // Saved path to user's log file
    isRunning: // boolean to check if app is already running
}

mtgaCardData: {
    playerMtgaCards: // Array of card data in player's collection,
    allMtgaCards: // Array of all parsed card data from the log file
    playerTokens: // Array of all player wildcards, gems, gold, etc,
    minedDecks: // Array of decks from sources
    savedDecks: // Array of decks saved by the user for future reference
}

dataToRender: {
    newCards: // Array of cards newly added to collection,
    insideDecklist: // Object containing the metadata and details of a single deck
}
```

## Troubleshooting
A troubleshooting and FAQ section will be added to the app's website.
- Confirm that "detailed logs" are selected in your Magic Arena account settings.
- Delete the Settings.txt file from `..\AppData\Roaming\MTGA Pathway` to refresh the app or clear any saved data.
- Disable your anti-virus AT YOUR OWN RISK since MTGA Pathway is considered a 3rd party app.

## Running the tests

Testing is a work in progress >_> [Jest](https://jestjs.io/docs/en/getting-started) is the only testing libarary used so far.
```
yarn test
```

## Deployment

Create an executable file to install the program using
[electron-builder](https://github.com/electron-userland/electron-builder)

```
yarn package
```

## Built With

* [Electron](https://electronjs.org/docs) - Cross platform desktop apps with JavaScript
* [NEXT.js](https://reactjs.org/docs/getting-started.html) - React Framework

## Contributing

TBD

## Authors

* **Mark Alaniz** - *Initial work* - [Digald](https://github.com/Digald)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Scryfall](https://scryfall.com/docs/api) - Bulk Card Data
* [MTGGoldfish](https://scryfall.com/docs/api) - Competitve Deck Lists
* You - For using my app.
