// Native
const { join } = require("path");
const path = require("path");
const { format } = require("url");

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const settings = require("electron-settings");
global.esettings = settings;
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

// import functions
const readLogFile = require("./functions/readLogFile.js");
const executeLogFile = require("./functions/executeLogFile.js");
const updateMatches = require("./functions/updateMatches.js");
const initiateScrape = require("./functions/initiateScrape.js");

// WINDOWS Get user home drive and username
const userHome = process.env.HOME;
const winAbsPath = `${userHome}/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;
settings.set("rawData.path", winAbsPath);
// Read the file and format slightly removing new lines and carriage
const logData = readLogFile(winAbsPath);

ipcMain.on("readLog", async (event, message) => {
  await executeLogFile(logData, mainWindow);
  // Begin updating collection matches to scraped decks
  await updateMatches();
  event.sender.send("loading-status", true);
});

ipcMain.on("grab-decks", async function(event, args) {
  await initiateScrape(event);
});

ipcMain.on("delete-saved-deck", (event, arg) => {
  if (arg === "delete-saved-deck") {
    event.sender.send("delete-saved-deck", "delete-saved-deck");
  }
});

ipcMain.on("send-restrict-color", (event, arg) => {
  event.sender.send("get-restrict-color", arg);
});

ipcMain.on("send-filter-color", (event, arg) => {
  event.sender.send("get-filter-color", arg);
});
