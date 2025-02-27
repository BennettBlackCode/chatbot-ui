import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../context/ChatContext';

const ChatInterface = ({ title = "Chat Assistant" }) => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="chat-container w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b pb-3 pt-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <ChatInput />
    </Card>
  );
};

export default ChatInterface;
