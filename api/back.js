export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "No API key found." });
    }
    // Make request to your API provider (e.g. OpenAI)
    const apiResponse = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 100,
      }),
    });

    if (!apiResponse.ok) {
      const err = await apiResponse.text();
      return res.status(500).json({ error: "API error: " + err });
    }

    const data = await apiResponse.json();
    res.status(200).json({ reply: data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
