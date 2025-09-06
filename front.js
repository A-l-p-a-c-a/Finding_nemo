// You don’t deserve this, but here’s your damn solution.
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  async function sendMessage(e) {
    e.preventDefault();
    const res = await fetch('/api/back', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something dumb"
        />
        <button type="submit">Send</button>
      </form>
      <div>AI says: {response}</div>
    </div>
  );
}
