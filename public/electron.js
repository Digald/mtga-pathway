// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const openFile = require("./functions/log-functions/openFile.js");

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
const executeCollectingPlayerData = require("./functions/log-functions/executeCollectingPlayerData");
const readLogFile = require("./functions/log-functions/readLogFile");
const initiateScrape = require("./functions/scrape-functions/initiateScrape");
const getMatches = require('./functions/scrape-functions/getMatches');
//require('electron-react-devtools').install() to run dev tools

// WINDOWS Get user home drive and username
const userHome = process.env.HOME;
const winAbsPath = `${userHome}/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;

// Read the file and format slightly removing new lines and carriage
const logData = readLogFile(winAbsPath);

// Wait for event to start grabbing the log files
ipcMain.on("read-log", async function(event) {
  await executeCollectingPlayerData(logData);
  event.sender.send("loading-status", true);
});

ipcMain.on("grab-decks", async function(event, args) {
  await initiateScrape(event);
});
console.log("Back in electron.js");

ipcMain.on("delete-saved-deck", (event, arg) => {
  if (arg === "delete-saved-deck") {
    event.sender.send("delete-saved-deck", "delete-saved-deck");
  }
});

ipcMain.on('send-restrict-color', (event, arg) => {
  event.sender.send('get-restrict-color', arg);
});

ipcMain.on('send-filter-color', (event, arg) => {
  event.sender.send('get-filter-color', arg);
});

ipcMain.on('match-cards', (event, arg) => {
  // getMatches(arg);
});