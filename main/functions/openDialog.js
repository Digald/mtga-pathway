const { dialog } = require("electron");
const settings = require("electron-settings");
const executeLogFile = require("./executeLogFile");
const readLogFile = require("./readLogFile");

module.exports = async function(mainWindow) {
  // Opens dialog window to navagate to log file
  const fileArr = dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      {
        name: "Text Log Files",
        extensions: ["txt"]
      }
    ]
  });

  // if no files
  if (!fileArr) return;
  const filePath = fileArr[0];
  settings.set("rawData.path", filePath);
  const logData = readLogFile(filePath);

  // Run log file data collecting as usual after finding file
  executeLogFile(logData, mainWindow);
  mainWindow.webContents.send("loading-status", {
    isLoaded: true,
    isInvalidFile: false
  });
  mainWindow.webContents.send(
    "get-newCards",
    settings.get("dataToRender.newCards")
  );
};
