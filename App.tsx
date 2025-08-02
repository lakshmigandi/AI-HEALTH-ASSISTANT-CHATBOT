import React, { useState, useEffect } from 'react';

interface Message {
  sender: 'AI' | 'You';
  text: string;
}

const TypingIndicator: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div style={{ color: '#888', fontStyle: 'italic' }}>AI is typing{dots}</div>;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'AI',
      text: 'Welcome! This assistant can help answer basic health questions.\nIt’s still learning, so it may not know everything yet. Type a message below to get started!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'You', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply: Message = {
        sender: 'AI',
        text: "Sorry, I’m still learning. Please ask something else!",
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Health Assistant</h1>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          height: 350,
          overflowY: 'auto',
          background: '#f9f9f9',
          borderRadius: '6px',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '0.5rem 0' }}>
            <strong>{msg.sender}:</strong> <span>{msg.text}</span>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a health question..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSend} style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
      </div>

      <footer style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#777' }}>
        © 2025 Dr. Lakshmi Gandi | AI Health Demo
      </footer>
    </div>
  );
};

export default App;