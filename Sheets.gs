function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheets = {
    INPUT: ["date", "source", "title", "url", "status"],
    HEADLINE_ANALYSIS: [
      "date",
      "source",
      "title",
      "url",
      "institutionality",
      "human_centredness",
      "tone",
      "audience",
      "value",
      "risk",
      "rewrite"
    ]
  };

  Object.keys(sheets).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);

    if (sh.getLastRow() === 0) {
      sh.appendRow(sheets[name]);
    }
  });
}
