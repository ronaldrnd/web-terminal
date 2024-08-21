import React, { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  const [message, setMessage] = useState('');
  const fullMessage = "Welcome to this terminal simulation project. This project is a practice for learning CI/CD.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setMessage(prev => {
        const nextMessage = fullMessage.slice(0, index + 1);
        index++;
        return nextMessage;
      });
      if (index >= fullMessage.length) {
        clearInterval(timer);
        setTimeout(() => {
          setMessage(''); // Clear the message
          index = 0; // Reset index
          // Restart the animation after clearing
          timer = setInterval(() => {
            setMessage(prev => {
              const nextMessage = fullMessage.slice(0, index + 1);
              index++;
              return nextMessage;
            });
            if (index >= fullMessage.length) {
              clearInterval(timer);
            }
          }, 50);
        }, 30000); // Wait 30 seconds before restarting
      }
    }, 50); // Adjust the speed by changing the interval (milliseconds)

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-green-400 font-mono fixed top-0 left-0 right-0 p-4 bg-gray-900">
      {message}
    </div>
  );
};

export default WelcomeMessage;
