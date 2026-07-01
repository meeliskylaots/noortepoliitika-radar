function fetchSources() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("INPUT");

  const sources = [
    "https://www.err.ee/rss",
    "https://www.oecd.org/newsroom/rss.xml"
  ];

  sources.forEach(url => {
    try {
      const xml = UrlFetchApp.fetch(url).getContentText();
      const doc = XmlService.parse(xml);
      const root = doc.getRootElement();
      const items = root.getDescendants();

      items.forEach(el => {
        const text = el.getText ? el.getText() : "";

        if (!text) return;

        if (CONFIG.KEYWORDS.some(k => text.toLowerCase().includes(k))) {
          sheet.appendRow([
            new Date(),
            url,
            text.substring(0, 120),
            url,
            "NEW"
          ]);
        }
      });

    } catch (e) {
      Logger.log("RSS error: " + url);
    }
  });
}
