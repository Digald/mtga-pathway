const { ipcRenderer } = require("electron");
const settings = require("electron-settings");
// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer;
  global.esettings = settings;
});
