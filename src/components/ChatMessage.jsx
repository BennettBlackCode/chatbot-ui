import React from 'react';
import { cn } from '../lib/utils';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'message',
        isUser ? 'user-message' : 'bot-message'
      )}
    >
      {message.text}
    </div>
  );
};

export default ChatMessage;
