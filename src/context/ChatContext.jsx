import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the chat context
const ChatContext = createContext();

// Custom hook to use the chat context
export const useChat = () => useContext(ChatContext);

// Chat provider component
export const ChatProvider = ({ children, apiEndpoint }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      { id: '0', sender: 'bot', text: 'Hello! How can I help you today?' }
    ]);
  }, []);

  // Send a message to the bot
  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Create a new user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };
    
    // Add the user message to the chat
    setMessages(prev => [...prev, userMessage]);
    
    // Show the bot is typing
    setIsLoading(true);
    setError(null);
    
    try {
      // Make API call to your n8n webhook
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Create a bot message from the response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.response || "Sorry, I couldn't process your request."
      };
      
      // Add the bot message to the chat
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to get a response. Please try again.');
      
      // Add an error message to the chat
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Sorry, there was an error processing your request. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all messages
  const clearChat = () => {
    setMessages([
      { id: '0', sender: 'bot', text: 'Hello! How can I help you today?' }
    ]);
  };

  // The value provided to the context consumers
  const value = {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
