// Minimal Vercel API handler for OpenAI chat
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: "Missing message" });
    return;
  }

  // Replace with your actual OpenAI key in Vercel env vars!
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    res.status(500).json({ error: "OpenAI API key not set" });
    return;
  }

  try {
    // Call OpenAI API (chat completions)
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const openaiData = await openaiRes.json();
    const reply = openaiData.choices?.[0]?.message?.content || "No reply";
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: "OpenAI API call failed", details: String(e) });
  }
}
