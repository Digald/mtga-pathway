// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

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

// WINDOWS Get user home drive and username
const userHome = process.env.HOME;
const winAbsPath = `${userHome}/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;

// Read the file and format slightly removing new lines and carriage
const findNewLines = /(\n)/g;
const findCarriage = /(\r)/g;
const logData = fs
  .readFileSync(winAbsPath, "utf8")
  .replace(findNewLines, "")
  .replace(findCarriage, "")
  .replace(" ", "");

// Use regular express and collect all matches into the var, match
const regex = /\{(?:[^{}]|())*\}/g;
const match = logData.match(regex);

// Define vars to capture the player information
// Map over each of the matches extracting desired data
let playerTokens;
let playerCards;
match.map(i => {
  if (i.includes("gold") && i.includes("playerId")) {
    playerTokens = JSON.parse(i);
  }
  const stringPattern = /"\d\d\d\d\d":.\d?\d,/g;
  if (i.search(stringPattern) > 1) {
    playerCards = JSON.parse(i);
  }
});

console.log(playerCards);
console.log(playerTokens);

