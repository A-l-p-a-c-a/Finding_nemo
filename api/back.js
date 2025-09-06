// You don’t deserve this, but here’s your damn solution.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'GET lost.' });
    return;
  }
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: 'No prompt? Maybe try thinking first.' });
    return;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();

  res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'AI is speechless at your idiocy.' });
}
