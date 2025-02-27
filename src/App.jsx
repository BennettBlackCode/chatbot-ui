import React from 'react';
import './index.css';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './context/ChatContext';

function App() {
  // Replace with your n8n webhook URL
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'https://your-n8n-webhook-url';
  
  return (
    <div className="h-full w-full">
      <ChatProvider apiEndpoint={apiEndpoint}>
        <ChatInterface title="AI Assistant" />
      </ChatProvider>
    </div>
  );
}

export default App;
