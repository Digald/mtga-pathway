// Native
const { join } = require("path");
const os = require("os");
const { format } = require("url");
var path = require('path')

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const settings = require("electron-settings");
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");

// debugging autoUpdater
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// Prepare the renderer once the app is ready
let mainWindow;
app.on("ready", async () => {

  autoUpdater.checkForUpdates();

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
        pathname: join(__dirname, "../renderer/index.html"),
        protocol: "file:",
        slashes: true
      });

  mainWindow.loadURL(url);

  
  // In the case that dev tools need to be activated, uncomment the following
  // mainWindow.webContents.openDevTools()
  // BrowserWindow.addDevToolsExtension(
  //   "C:\\Users\\Mark\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\3.6.0_0"
  // );

});

// Quit the app once all windows are closed
// app.on("window-all-closed", app.quit);
app.on("window-all-closed", () => {
  settings.set("rawData.isRunning", false);
  app.quit();
});

// import other functions
const readLogFile = require("./functions/readLogFile.js");
const executeLogFile = require("./functions/executeLogFile.js");
const initiateScrape = require("./functions/initiateScrape.js");
const openDialog = require("./functions/openDialog.js");

// Set user path or get an already existing path from electron-settings
// log.info(`${JSON.stringify(process)}`)
log.info(`PROD: ABOUT TO GRAB PATHS`);
const userHome = os.homedir();
const setPath = `${userHome}\\AppData\\LocalLow\\Wizards Of The Coast\\MTGA\\output_log.txt`;
log.info(`PROD: ${setPath}`);

const hasSetPath = settings.get("rawData.path");
if (!hasSetPath) {
  settings.set("rawData.path", setPath);
}
const winAbsPath = settings.get("rawData.path");

// Read the file and format slightly removing new lines and carriage
// Try to put this within the read log event
const logData = readLogFile(winAbsPath);

// Called on startup. Tells frontend when data is ready to load or if there is an error with the log file
ipcMain.on("readLog", async (event, arg) => {
  log.info("PROD: RECIEVED READLOG ON MAIN");
  if (logData === "send error") {
    log.info("PROD: LOGDATA === SEND ERROR");
    event.sender.send(
      "invalid-logfile",
      `There doesn't seem to be a file to read at this path: ${winAbsPath}. Try importing the log file wherever it may be (Example: \\AppData\\LocalLow\\Wizards Of The Coast\\MTGA\\output.txt )`
    );
    log.info("PROD: ERROR SENT TO FRONT END BECAUSE OF BAD FILE");
    return;
  }
  // create if statment if app is already running
  if (!settings.get("rawData.isRunning")) {
    log.info("PROD: SHOULD START EXECUTING LOG FILE FOR THE FIRST TIME");
    await executeLogFile(logData, mainWindow);
    return;
  }
  log.info("PROD: RIGHT BEFORE SENDING LOADING STATUS");
  event.sender.send("loading-status", {
    isLoaded: true,
    isInvalidFile: false,
    newCards: settings.get("dataToRender.newCards")
  });
  log.info("PROD: SHOULD HAVE SENT LOADING STATUS BACK");
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

/** --------------------------------------------
 * AUTO UPDATER
 * ---------------------------------------------
 */
autoUpdater.on("checking-for-update", () => {
  log.info("CHECKING FOR UPDATES");
});

autoUpdater.on("update-available", info => {
  log.info("update available");
});

autoUpdater.on("update-not-available", info => {
  log.info("update NOT available");
});

autoUpdater.on("error", err => {
  log.info(`Error: ${err.toString()}`);
});

autoUpdater.on("download-progress", progressObj => {
  log.info(`${progressObj}`);
});

autoUpdater.on("update-downloaded", info => {
  log.info(`Installing now`);
  autoUpdater.quitAndInstall();
});
