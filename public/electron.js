// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const openFile = require("./functions/log-functions/openFile.js");
const settings = require("electron-settings");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Base template taken from the docs itself
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Import Log File",
          accelerator: "CmdOrCtrl+O",
          click() {
            openFile(mainWindow);
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click() {
            require("electron").shell.openExternal("https://electronjs.org");
          }
        }
      ]
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle Developer Tools",
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "F12",
          click() {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const searchLogFile = require("./functions/log-functions/searchLogFile");
// const updateRawCollection = require("./functions/log-functions/updateRawCollection");
const readLogFile = require("./functions/log-functions/readLogFile");
// Inside read-log event
const calculateCountDiff = require("./functions/log-functions/calculateCountDifference");
const sortDifferences = require("./functions/log-functions/sortDifferences");
const extractNewCardQuantity = require("./functions/log-functions/extractNewCardQuantity");
const packageCollection = require("./functions/log-functions/packageCollection");
const parseCards = require("./functions/log-functions/parseCards");

// Scrape and matches
const initiateScrape = require("./functions/scrape-functions/initiateScrape");
const updateMatches = require("./functions/scrape-functions/updateMatches");
//require('electron-react-devtools').install() to run dev tools

// WINDOWS Get user home drive and username
const userHome = process.env.HOME;
const winAbsPath = `${userHome}/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;
settings.set("rawData.path", winAbsPath);
// Read the file and format slightly removing new lines and carriage
const logData = readLogFile(winAbsPath);

// Wait for event to start grabbing the log files
ipcMain.on("read-log", async function(event) {
  // Grab player data from the read log file
  const playerData = await searchLogFile(logData, mainWindow);
  const { playerTokens, playerCards } = playerData;
  // Save player token data immediately
  settings.set("mtgaCardData.playerTokens", playerTokens);
  // Next Update the Raw collection of cards
  // updateRawCollection(playerCards);
  const playerMainCollection = packageCollection(playerCards);
  const storedRawData = settings.get("rawData.cards");
  let allDifferences = [];
  let onlyNewCards = [];
  let newQuantities = [];
  if (!storedRawData) {
    settings.set("rawData.cards", playerMainCollection);
    allDifferences = ["first-time"];
  } else {
    allDifferences = calculateCountDiff(storedRawData, playerMainCollection);
    onlyNewCards = sortDifferences(storedRawData, playerMainCollection);
    newQuantities = extractNewCardQuantity(allDifferences, onlyNewCards);
    // onlyNewCards = [{arena_id: "67804", quantity: 1}];
    // allDiff = [{ arena_id: "68656", quantity: 3 }, {arena_id: "67804", quantity: 1}];
    // newQuantities = [{ arena_id: "68656", quantity: 3 }];
  }
  //If this is the first time running or there are new cards to parse, allDiff.length will be greater than 0
  if (allDifferences.length > 0) {
    // Only run for using the app for the first time
    if (allDifferences[0] === "first-time") {
      parseCards(playerMainCollection);
    }
    // Run else statement when new cards are found
    else {
      settings.set("rawData.cards", playerMainCollection);
      parseCards(onlyNewCards, newQuantities);
    }
  }
  // Nothing new to update, more logic to be added
  else {
    console.log("nothing to update");
  }
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
