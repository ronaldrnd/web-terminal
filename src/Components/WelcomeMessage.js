import React, { useState, useEffect, useRef } from 'react';

const WelcomeMessage = () => {
  const [message, setMessage] = useState('');
  const fullMessage = "Welcome to this terminal simulation project. This project is a practice for learning CI/CD.";

  const timerRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const startAnimation = () => {
      timerRef.current = setInterval(() => {
        setMessage(prev => {
          const nextMessage = fullMessage.slice(0, index + 1);
          index++;
          return nextMessage;
        });
        if (index >= fullMessage.length) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            setMessage(''); // Clear the message
            index = 0; // Reset index
            // Restart the animation after clearing
            timerRef.current = setInterval(() => {
              setMessage(prev => {
                const nextMessage = fullMessage.slice(0, index + 1);
                index++;
                return nextMessage;
              });
              if (index >= fullMessage.length) {
                clearInterval(timerRef.current);
              }
            }, 50);
          }, 30000); // Wait 30 seconds before restarting
        }
      }, 50); // Adjust the speed by changing the interval (milliseconds)
    };

    startAnimation();

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="text-green-400 font-mono fixed top-0 left-0 right-0 p-4 bg-gray-900">
      {message}
    </div>
  );
};

export default WelcomeMessage;