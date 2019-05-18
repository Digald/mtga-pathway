const fs = require('fs');

module.exports = function(AbsPath) {
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
    console.log(err);
    console.log('Not the right file');
  }
  return logData;
};