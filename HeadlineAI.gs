function analyzeHeadlines() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const input = ss.getSheetByName("INPUT");
  const output = ss.getSheetByName("HEADLINE_ANALYSIS");

  const rows = input.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] !== "NEW") continue;

    const title = rows[i][2];

    const prompt = `
Analüüsi seda avaliku sektori pealkirja mainekujunduse vaates:

"${title}"

Tagasta AINULT JSON:

{
  "institutionality": 0-100,
  "human_centredness": 0-100,
  "tone": "bureaucratic|neutral|human|inspiring",
  "audience": "youth|teachers|parents|institution|general",
  "value": "1-2 sõna",
  "risk": "low|medium|high",
  "rewrite": "parem sihtrühmakeskne pealkiri"
}
`;

    const res = callAI(prompt);

    let data;
    try {
      data = JSON.parse(res.replace(/```json|```/g, "").trim());
    } catch (e) {
      data = {
        institutionality: 0,
        human_centredness: 0,
        tone: "neutral",
        audience: "unknown",
        value: "-",
        risk: "medium",
        rewrite: title
      };
    }

    output.appendRow([
      new Date(),
      rows[i][1],
      title,
      rows[i][3],
      data.institutionality,
      data.human_centredness,
      data.tone,
      data.audience,
      data.value,
      data.risk,
      data.rewrite
    ]);

    input.getRange(i + 1, 5).setValue("DONE");
  }
}
