/**
 * This is one of the first functions that reads the log file and scrapes all the card data and player token data I need from it.
 *
 * @param {string} logData The text of the entire mtg arena log file with spaces and carriage removed
 * @param {object} mainWindow the browser window for the app
 * @return {object} An object with two properties, playerTokens and playerCards. playerTokens holds meta game currency and playerCards holds the player's current collection
 */

module.exports = function(logData, mainWindow) {
    // Use regular express and collect all matches into the var, match
    const regex = /\{(?:[^{}]|())*\}/g;
    const match = logData.match(regex);
  
    // Define vars to capture the player information
    // Map over each of the matches extracting desired data
    let playerTokens;
    let playerCards;
  
    try {
      match.map(i => {
        if (i.includes("gold") && i.includes("playerId")) {
          playerTokens = JSON.parse(i);
        }
        const stringPattern = /"\d\d\d\d\d":.\d?\d,/g;
        if (i.search(stringPattern) > 1) {
          playerCards = JSON.parse(i);
        }
        return null;
      });
      const message = "";
      mainWindow.webContents.send("correct-logfile", message);
    } 
    catch (err) {
      // Tell user that the text file they tried to read is not valid
      const message = `It looks like we couldn't find the correct MTGA log file. Try hitting CTRL+O or File > Import Log File to select output.txt, wherever it may be (Example: ${
        process.env.HOME
      }\\AppData\\LocalLow\\Wizards Of The Coast\\MTGA\\output.txt)'`;
      
      mainWindow.webContents.send("invalid-logfile", message);
    }
    return { playerTokens, playerCards };
  };