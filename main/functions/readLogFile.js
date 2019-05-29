const fs = require('fs');

module.exports = function(AbsPath, mainWindow) {
  // Read the file and format slightly removing new lines and carriage
  const findNewLines = /(\n)/g;
  const findCarriage = /(\r)/g;
  let logData;
  try {
    logData = fs
      .readFileSync(AbsPath, "utf8")
      .replace(findNewLines, "")
      .replace(findCarriage, "")
      .replace(" ", "");
  } catch (err) {
    return 'send error';
  }
  return logData;
};