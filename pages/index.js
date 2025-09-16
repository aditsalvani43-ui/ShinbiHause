// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { role: 'user', content: input }, { role: 'ai', content: data.reply }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <h1>AI Chat</h1>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            <b>{m.role === 'user' ? 'You: ' : 'AI: '}</b>
            {m.content}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis pesan..." />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
    }
