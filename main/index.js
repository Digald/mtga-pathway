// Native
const { join } = require("path");
const os = require("os");
const { format } = require("url");

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const settings = require("electron-settings");

// Prepare the renderer once the app is ready
let mainWindow;
app.on("ready", async () => {
  await prepareNext("./renderer");

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js")
    }
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/start/index.html"),
        protocol: "file:",
        slashes: true
      });

  mainWindow.loadURL(url);
  BrowserWindow.addDevToolsExtension(
    "C:\\Users\\Mark\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\3.6.0_0"
  );
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// import other functions
const readLogFile = require("./functions/readLogFile.js");
const executeLogFile = require("./functions/executeLogFile.js");
const initiateScrape = require("./functions/initiateScrape.js");
const openDialog = require("./functions/openDialog.js");

// Set user path or get an already existing path from electron-settings
const userHome = process.env.HOME;
const setPath = `${userHome}/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;
const hasSetPath = settings.get("rawData.path");
if (!hasSetPath) {
  settings.set("rawData.path", setPath);
}
const winAbsPath = settings.get("rawData.path");

// Read the file and format slightly removing new lines and carriage
const logData = readLogFile(winAbsPath);

// Called on startup. Tells frontend when data is ready to load or if there is an error with the log file
ipcMain.on("readLog", async (event, arg) => {
  if (logData === "send error") {
    event.sender.send(
      "invalid-logfile",
      `There doesn't seem to be a file to read at this path: ${winAbsPath}. Try importing the log file wherever it may be (Example: \\AppData\\LocalLow\\Wizards Of The Coast\\MTGA\\output.txt )`
    );
    return;
  }
  await executeLogFile(logData, mainWindow);
  console.log('index70: ended readLog and should have sent back data');
  // event.sender.send = {
  //   isLoaded: true,
  //   isInvalidFile: false,
  //   newCards: settings.get("dataToRender.newCards")
  // };
});

// Sent if a user tries to correct their log file and needs to re-render the app
ipcMain.on("openDialog", (event, arg) => {
  openDialog(mainWindow);
});

ipcMain.on("grab-decks", async function(event, arg) {
  await initiateScrape(event);
});

ipcMain.on("delete-saved-deck", (event, arg) => {
  if (arg === "delete-saved-deck") {
    event.sender.send(
      "delete-saved-deck",
      settings.get("mtgaCardData.savedDecks")
    );
  }
});

ipcMain.on("send-restrict-color", (event, arg) => {
  event.sender.send("get-restrict-color", arg);
});

ipcMain.on("send-filter-color", (event, arg) => {
  event.sender.send("get-filter-color", arg);
});

ipcMain.on("get-initialData-DeckGrid", (event, arg) => {
  const decksList = settings.get("mtgaCardData.minedDecks");
  const savedDecks = settings.get("mtgaCardData.savedDecks");
  event.returnValue = { decksList, savedDecks };
});

ipcMain.on("get-newCards", (event, arg) => {
  // event.sender.send("res-newCards", settings.get("dataToRender.newCards"));
  event.returnValue = settings.get("dataToRender.newCards");
});

ipcMain.on("get-tokens-TopBar", (event, arg) => {
  event.returnValue = settings.get("mtgaCardData.playerTokens");
});

ipcMain.on("set-decklist", (event, arg) => {
  settings.set("dataToRender.insideDecklist", arg);
});

ipcMain.on("get-insideDeckList", (event, arg) => {
  event.returnValue = settings.get("dataToRender.insideDecklist");
});

ipcMain.on("get-savedDecks", (event, arg) => {
  event.returnValue = settings.get("mtgaCardData.savedDecks");
});

ipcMain.on("set-savedDecks", (event, arg) => {
  settings.set("mtgaCardData.savedDecks", arg);
});

ipcMain.on("get-sysinfo", (event, arg) => {
  const platform = os.platform();
  const usersPath = settings.get("rawData.path");
  event.returnValue = { platform, usersPath };
});
