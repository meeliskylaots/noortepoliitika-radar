function callAI(prompt) {
  const key = PropertiesService.getScriptProperties().getProperty("OPENAI_KEY");

  const res = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + key
    },
    payload: JSON.stringify({
      model: CONFIG.OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    })
  });

  return JSON.parse(res.getContentText()).choices[0].message.content;
}
