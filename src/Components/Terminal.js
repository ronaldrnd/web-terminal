import React, { useState } from 'react';
import WelcomeMessage from './WelcomeMessage';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHistory = [...history, `> ${input}`];
    setHistory(newHistory);
    setInput('');
    // Simule une commande pour démonstration
    setTimeout(() => {
      if (input === 'help') {
        setHistory([...newHistory, 'Available commands: help, clear']);
      } else if (input === 'clear') {
        setHistory([]);
      } else {
        setHistory([...newHistory, `Command executed: ${input}`]);
      }
    }, 500);
  };

  return (
    <div className="bg-gray-900 text-green-400 p-4 h-screen pt-20">
      <div className="font-mono">
        <WelcomeMessage />
        <div className="mb-4">
          {history.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <span className="text-green-400">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-2 bg-gray-800 text-green-400 border-none outline-none w-full"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
