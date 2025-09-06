// This runs on a Vercel server
import OpenAI from 'openai';

// Access the secure environment variable that Vercel provides
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Missing prompt in request body' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ result: completion.choices.message.content });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
