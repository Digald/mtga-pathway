const { dialog } = require("electron");
const executeCollectingPlayerData = require("./executeCollectingPlayerData");
const readLogFile = require("./readLogFile");

module.exports = function(mainWindow) {
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
  const logData = readLogFile(filePath);

  executeCollectingPlayerData(logData);
};
