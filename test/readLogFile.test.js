const readLogFile = require("../main/functions/readLogFile");

describe("Properly reads log file", () => {
  it("returns string with player cards", () => {
    const setPath = `C:/Users/Mark/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;
    expect(readLogFile(setPath)).toEqual(
      expect.stringContaining("PlayerInventory.GetPlayerCardsV3")
    );
  });

  it("returns string with player collection", () => {
    const setPath = `C:/Users/Mark/AppData/LocalLow/Wizards Of The Coast/MTGA/output_log.txt`;
    expect(readLogFile(setPath)).toEqual(
      expect.stringContaining("PlayerInventory.GetPlayerInventory")
    );
  });
});
